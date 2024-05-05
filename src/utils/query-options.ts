//Contains query options for react query
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { queryClient } from '@/config/query-client';
import {
  getAllDownloadedManga,
  getDownloadedChapterImageUrls,
  getDownloadedChapterList,
  getDownloadedMangaDetails,
  getDownloadedReadMarkers,
} from './download-calls';
import {
  followManga,
  getAllFollows,
  getAuthorMangas,
  getChapterImageUrls,
  getChapterList,
  getMangaDetails,
  getMangaFollowStatus,
  getReadChapterIds,
  unfollowManga,
} from './service-calls';

//Stale times
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export function getChaptersQuery(mangaId: string, useDownloaded: boolean) {
  return {
    queryKey: ['chapters', mangaId, useDownloaded],
    queryFn: () =>
      useDownloaded
        ? getDownloadedChapterList(mangaId)
        : getChapterList(mangaId),
    staleTime: ONE_MINUTE,
  } satisfies UseQueryOptions;
}

export function getMangaQuery(mangaId: string, useDownloaded: boolean) {
  return {
    queryKey: ['manga', mangaId, useDownloaded],
    queryFn: () =>
      useDownloaded
        ? getDownloadedMangaDetails(mangaId)
        : getMangaDetails(mangaId),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getReadMarkersQuery(mangaId: string, useDownloaded: boolean) {
  return {
    queryKey: ['read-chapters', mangaId, useDownloaded],
    queryFn: () =>
      useDownloaded
        ? getDownloadedReadMarkers(mangaId)
        : getReadChapterIds(mangaId),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

export function getChapterImagesQuery(
  chapterId: string,
  mangaId: string,
  useDownloaded: boolean,
  dataSaver: boolean = false
) {
  return {
    queryKey: ['chapter-images', chapterId, dataSaver, useDownloaded],
    queryFn: () =>
      useDownloaded
        ? getDownloadedChapterImageUrls(chapterId, mangaId)
        : getChapterImageUrls(chapterId, dataSaver),
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

export function getFollowStatusQuery(mangaId: string, useDownloaded: boolean) {
  return {
    queryKey: ['follow-status', mangaId],
    //If downloaded, always return true
    queryFn: () => (useDownloaded ? true : getMangaFollowStatus(mangaId)),
  } satisfies UseQueryOptions;
}

export function getDownloadedMangaQuery() {
  return {
    queryKey: ['downloaded-manga'],
    queryFn: () => getAllDownloadedManga(),
    staleTime: ONE_HOUR,
  } satisfies UseQueryOptions;
}

/*
 * MUTATIONS
 */

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
