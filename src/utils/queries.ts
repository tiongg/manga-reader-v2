import { queryClient } from '@/config/query-client';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import {
  AtHomeService,
  AuthorService,
  FeedService,
  MangaService,
  ReadMarkerService,
} from 'mangadex-client';

//Pagination limit
const LIMIT = 32;

//Stale times
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

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

export async function getFeed(offset: number = 0) {
  const feed = await FeedService.getUserFollowsMangaFeed({
    limit: LIMIT,
    offset: offset,
    translatedLanguageArray: ['en'],
    order: {
      readableAt: 'desc',
    },
    includesArray: ['manga'],
  });
  return feed.data;
}

export async function getMangas(ids: string[]) {
  const manga = await MangaService.getSearchManga({
    limit: LIMIT,
    offset: 0,
    idsArray: ids,
    includesArray: ['cover_art'],
  });
  return manga.data;
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
    url => `${baseUrl}/${dataMode}/${hash}/${url}`
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
  queryClient.invalidateQueries({
    queryKey: ['read-chapters', mangaId],
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

//Hooks
export function useGetMangaAndChapters(mangaId: string) {
  return { manga: useGetManga(mangaId), chapters: useGetChapters(mangaId) };
}

export function useGetChapters(mangaId: string) {
  return useQuery({
    queryKey: ['chapters', mangaId],
    queryFn: () => getChapters(mangaId),
    staleTime: ONE_MINUTE,
  });
}

export function useGetManga(mangaId: string) {
  return useQuery({
    queryKey: ['manga', mangaId],
    queryFn: () => getMangaDetails(mangaId),
    staleTime: ONE_HOUR,
  });
}

export function useGetReadMarkers(mangaId: string) {
  return useQuery({
    queryKey: ['read-chapters', mangaId],
    queryFn: () => getReadChapterIds(mangaId),
    staleTime: ONE_MINUTE,
  });
}

export function useGetChapterImages(
  chapterId: string,
  dataSaver: boolean = false
) {
  return useQuery({
    queryKey: ['chapter-images', chapterId, dataSaver],
    queryFn: () => getChapterImageUrls(chapterId, dataSaver),
    staleTime: ONE_HOUR,
  });
}

export function useGetAuthorMangas(authorId: string) {
  return useQuery({
    queryKey: ['author-mangas', authorId],
    queryFn: () => getAuthorMangas(authorId),
    staleTime: ONE_HOUR,
  });
}
