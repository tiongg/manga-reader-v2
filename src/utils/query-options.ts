//Contains query options for react query
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { queryClient } from '@/config/query-client';
import {
  followManga,
  getAllFollows,
  getAuthorMangas,
  getChapterImageUrls,
  getChapters,
  getMangaDetails,
  getMangaFollowStatus,
  getReadChapterIds,
  unfollowManga,
} from './service-calls';

//Stale times
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export function getChaptersQuery(mangaId: string) {
  return {
    queryKey: ['chapters', mangaId],
    queryFn: () => getChapters(mangaId),
    staleTime: ONE_MINUTE,
  } satisfies UseQueryOptions;
}

export function getMangaQuery(mangaId: string) {
  return {
    queryKey: ['manga', mangaId],
    queryFn: () => getMangaDetails(mangaId),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getReadMarkersQuery(mangaId: string) {
  return {
    queryKey: ['read-chapters', mangaId],
    queryFn: () => getReadChapterIds(mangaId),
    staleTime: ONE_MINUTE,
  } satisfies UseQueryOptions;
}

export function getChapterImagesQuery(
  chapterId: string,
  dataSaver: boolean = false
) {
  return {
    queryKey: ['chapter-images', chapterId, dataSaver],
    queryFn: () => getChapterImageUrls(chapterId, dataSaver),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getAuthorMangasQuery(authorId: string) {
  return {
    queryKey: ['author-mangas', authorId],
    queryFn: () => getAuthorMangas(authorId),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getAllFollowsQuery() {
  return {
    queryKey: ['all-follows'],
    queryFn: () => getAllFollows(),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getFollowStatusQuery(mangaId: string) {
  return {
    queryKey: ['follow-status', mangaId],
    queryFn: () => getMangaFollowStatus(mangaId),
  } satisfies UseQueryOptions;
}

export function getFollowMangaMutation(mangaId: string) {
  return {
    mutationFn: () => followManga(mangaId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['follow-status', mangaId] }),
  } satisfies UseMutationOptions;
}

export function getUnfollowMangaMutation(mangaId: string) {
  return {
    mutationFn: () => unfollowManga(mangaId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['follow-status', mangaId] }),
  } satisfies UseMutationOptions;
}
