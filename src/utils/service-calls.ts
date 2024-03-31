//Contains wrapper for service calls
import _ from 'lodash';
import {
  AtHomeService,
  FeedService,
  FollowsService,
  MangaService,
  ReadMarkerService,
} from 'mangadex-client';

import { queryClient } from '@/config/query-client';
import { getRelationship } from './get-relationship';

//Pagination limit
export const LIMIT = 32;

export async function getMangaDetails(mangaId: string) {
  const manga = await MangaService.getMangaId({
    id: mangaId,
    includesArray: ['cover_art', 'author'],
  });
  return manga.data;
}

export async function getChapters(mangaId: string, offset: number = 0) {
  const mangaChapters = await MangaService.getMangaIdFeed({
    id: mangaId,
    translatedLanguageArray: ['en'],
    limit: 500,
    offset: offset,
    order: {
      volume: 'desc',
      chapter: 'desc',
    },
  });
  return mangaChapters.data;
}

/**
 * Gets feed data. Replace manga relationship with full manga data, rather than a relationship
 * @param offset - Offset for the feed
 * @returns Chapter feed with manga data loaded
 */
export async function getFeedWithManga(offset: number = 0) {
  const feed = await FeedService.getUserFollowsMangaFeed({
    limit: LIMIT,
    offset: offset,
    translatedLanguageArray: ['en'],
    order: {
      readableAt: 'desc',
    },
    includesArray: ['manga'],
  });
  const feedIds = (feed.data ?? []).map(
    (chapter) => getRelationship(chapter, 'manga').id!
  );
  const mangaData = await getMangas(feedIds);
  const mangaMap = new Map(
    (mangaData.data ?? []).map((manga) => [manga.id!, manga])
  );
  //Manually replace the manga relationship with the full manga data
  for (const feedData of feed.data ?? []) {
    const mangaId = getRelationship(feedData, 'manga').id!;
    const indexOfRelationship = (feedData.relationships ?? []).findIndex(
      (r) => r.type === 'manga'
    );
    if (indexOfRelationship === -1) {
      continue;
    }
    feedData.relationships![indexOfRelationship] = mangaMap.get(mangaId)!;
  }

  return feed;
}

//Cant offset when querying by id,
//Since the id array itself is too large
export async function getMangas(ids: string[]) {
  const manga = await MangaService.getSearchManga({
    limit: LIMIT,
    idsArray: ids,
    includesArray: ['cover_art', 'author'],
  });
  return manga;
}

export async function getReadChapterIds(mangaId: string) {
  const read = await ReadMarkerService.getMangaChapterReadmarkers({
    id: mangaId,
  });
  return new Set(read.data ?? []);
}

/**
 * Gets urls for all pages in the chapter
 * @param chapterId - Chapter id to get image urls
 * @param dataSaver - Data saver mode enabled
 * @returns Array of image urls, corresponding to the pages in the chapter
 */
export async function getChapterImageUrls(
  chapterId: string,
  dataSaver: boolean = false
) {
  const chapterData = await AtHomeService.getAtHomeServerChapterId({
    chapterId,
  });
  const baseUrl = chapterData.baseUrl!;
  const {
    dataSaver: dataSaverUrls,
    data: dataUrls,
    hash,
  } = chapterData.chapter!;
  const dataMode = dataSaver ? 'data-saver' : 'data';
  const urls = ((dataSaver ? dataSaverUrls : dataUrls) ?? []).map(
    (url) => `${baseUrl}/${dataMode}/${hash}/${url}`
  );
  return urls;
}

export async function markChapterAsRead(
  mangaId: string,
  chapterIds: string | string[]
) {
  chapterIds = _.castArray(chapterIds);
  await ReadMarkerService.postMangaChapterReadmarkers({
    id: mangaId,
    updateHistory: false,
    requestBody: {
      chapterIdsRead: chapterIds,
    },
  });
  await queryClient.invalidateQueries({
    queryKey: ['read-chapters', mangaId],
  });
  await queryClient.setQueryData(['read-chapters', mangaId], (oldData: any) => {
    const newData = new Set(oldData ?? []);
    for (const chapterId of chapterIds) {
      newData.add(chapterId);
    }
    return newData;
  });
}

export async function getAuthorMangas(authorId: string) {
  const mangas = await MangaService.getSearchManga({
    limit: LIMIT,
    offset: 0,
    authorOrArtist: authorId,
    includesArray: ['cover_art', 'author'],
  });
  return mangas.data;
}

export async function getMangaFollowStatus(mangaId: string) {
  try {
    const status = await FollowsService.getUserFollowsMangaId({
      id: mangaId,
    });
    return status.result === 'ok';
  } catch (ex) {
    return false;
  }
}

export async function getAllFollows() {
  const status = await MangaService.getMangaStatus({
    status: 'reading',
  });
  return status.statuses;
}

export async function followManga(mangaId: string) {
  const res = await Promise.all([
    MangaService.postMangaIdFollow({
      id: mangaId,
    }),
    MangaService.postMangaIdStatus({
      id: mangaId,
      requestBody: {
        status: 'reading',
      },
    }),
  ]);
  return res.every((res) => res.result === 'ok');
}

export async function unfollowManga(mangaId: string) {
  const res = await Promise.all([
    MangaService.deleteMangaIdFollow({
      id: mangaId,
    }),
    MangaService.postMangaIdStatus({
      id: mangaId,
      requestBody: {
        status: null,
      },
    }),
  ]);
  return res.every((res) => res.result === 'ok');
}
