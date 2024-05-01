//Contains wrapper for service calls
import { Image } from 'expo-image';
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

export async function getChapterList(mangaId: string, offset: number = 0) {
  //TODO: Throttled queue to get all chapters
  const mangaChapters = await MangaService.getMangaIdFeed({
    id: mangaId,
    translatedLanguageArray: ['en'],
    limit: 500,
    offset: offset,
    order: {
      volume: 'desc',
      chapter: 'desc',
    },
    includeExternalUrl: 0,
    includeEmptyPages: 0,
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
    includeEmptyPages: 0,
    includeExternalUrl: 0,
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
 * @param baseUrl - Base url for the chapter. Defaults to the chapter's base url
 * @returns Array of image urls, corresponding to the pages in the chapter
 */
export async function getChapterImageUrls(
  chapterId: string,
  dataSaver: boolean = false,
  baseUrl?: string
) {
  const chapterData = await AtHomeService.getAtHomeServerChapterId({
    chapterId,
  });
  baseUrl ??= chapterData.baseUrl!;
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

/**
 * Gets recommendations based on the manga
 *
 * Recommendations are sourced from AniList, then converted to MangaDex mangas
 * @param aniListId - anilist id of the manga
 */
export async function getRecommendations(aniListId: number, limit = 5) {
  const query = `
    query media($id: Int, $type: MediaType, $limit: Int) {
      Media(id: $id, type: $type) {
        recommendations(perPage: $limit, sort: [RATING_DESC, ID]) {
          nodes {
            id
            mediaRecommendation {
              id
              title {
                userPreferred
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    id: aniListId,
    type: 'MANGA',
    limit: limit,
  };
  //TODO: Type this
  const aniListRec = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json() as any);

  //🙏
  const recommendationTitles: string[] = aniListRec.data['Media'][
    'recommendations'
  ]['nodes'].map(
    (x: any) => x['mediaRecommendation']['title']['userPreferred']
  );

  //Recommendations should be limited to 5
  const mangas = await Promise.all(
    recommendationTitles.slice(0, limit).map((title: string) =>
      MangaService.getSearchManga({
        title,
        limit: 1,
        includesArray: ['cover_art'],
        order: {
          rating: 'desc',
        },
      }).then((res) => res.data?.[0])
    )
  ).then((res) => res.filter(Boolean));

  return mangas;
}

export async function prefetchChapterImages(
  chapterId: string,
  dataSaver: boolean = false
) {
  console.log('[Experimental] Prefetching chapter images...');
  const urls = await getChapterImageUrls(chapterId, dataSaver);
  const res = await Image.prefetch(urls, 'memory-disk');
  if (res) {
    console.log('[Experimental] Prefetching complete!');
  } else {
    console.log('[Experimental] Prefetching failed!');
  }
}
