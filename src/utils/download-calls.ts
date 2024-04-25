// Cached service calls
// Returns the same data as the service call, but with cached data
import * as fs from 'expo-file-system';
import { Chapter, Manga } from 'mangadex-client';
import throttledQueue from 'throttled-queue';

import { queryClient } from '@/config/query-client';
import {
  getChapterImageUrls,
  getChapters,
  getMangaDetails,
} from './service-calls';
import { waitFor } from './wait-for';

// Consider cache directory instead
//THIS ENDS WITH A TRAILING /
const DOWNLOAD_PREFIX = `${fs.documentDirectory}md-downloads`;
const LOG_CACHE = true;

function log(...args: any[]) {
  if (!LOG_CACHE) return;
  console.log('[Downloads]', ...args);
}

/**
 * Clears downloads directory
 */
export async function clearDownloads() {
  await fs.deleteAsync(DOWNLOAD_PREFIX);
  log('Downloads cleared');
  queryClient.invalidateQueries({
    queryKey: ['downloaded-manga'],
  });
}

/**
 * Ensures directory exists for given path
 * @param path - Path that should exist
 */
async function ensureDirectoryExist(path: string) {
  const dirPath = path.split('/').slice(0, -1).join('/');
  const { exists } = await fs.getInfoAsync(dirPath);
  if (exists) return;
  await fs.makeDirectoryAsync(dirPath, { intermediates: true });
  log('Created directory', dirPath);
}

//Manga details cache path
function getMangaDetailsPath(mangaId: string) {
  return `${DOWNLOAD_PREFIX}/manga/${mangaId}.json`;
}

//Folder containing downloaded chapter images
function getChaptersDirectory(mangaId: string, chapterId: string) {
  return `${DOWNLOAD_PREFIX}/chapter/${mangaId}/${chapterId}`;
}

/**
 * Saves manga to downloads cache
 * @param manga - Manga to save
 * @param override - true to override existing cache. Default is true
 */
async function saveMangaDetails(manga: Manga, override: boolean = true) {
  const mangaDetailsPath = getMangaDetailsPath(manga.id!);
  const { exists: mangaDetailsExist } = await fs.getInfoAsync(mangaDetailsPath);
  if (!mangaDetailsExist || override) {
    await ensureDirectoryExist(mangaDetailsPath);
    await fs.writeAsStringAsync(mangaDetailsPath, JSON.stringify(manga));
    log('Saved manga details', manga.id);
  }
}

/**
 * Gets manga details. If downloaded, returns cached data instead.
 * @param mangaId - Manga to get
 */
export async function getMangaDetailsCached(mangaId: string) {
  const cachePath = getMangaDetailsPath(mangaId);
  const { exists } = await fs.getInfoAsync(cachePath);
  if (exists) {
    log('Details cache hit', mangaId);
    const data = await fs.readAsStringAsync(cachePath);
    return JSON.parse(data) as Manga;
  }
  return await getMangaDetails(mangaId);
}

/**
 * Gets chapter image urls. If chapters are downloaded, returns cached data instead.
 * @param chapterId - Chapter to get images for
 * @param dataSaver - Data saver mode enabled
 * @returns string[] - Chapter image urls
 */
export async function getChapterImageUrlsCached(
  chapterId: string,
  mangaId: string,
  dataSaver: boolean = false
) {
  const chapterDirectory = getChaptersDirectory(mangaId, chapterId);
  const { exists } = await fs.getInfoAsync(chapterDirectory);
  if (exists) {
    log('Chapters cache hit', chapterId);
    const urls = (await fs.readDirectoryAsync(chapterDirectory))
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((url) => `${chapterDirectory}/${url}`);
    return urls;
  }
  return getChapterImageUrls(chapterId, dataSaver);
}

/**
 * Downloads a chapter, along with manga details
 * @param manga - Manga chapter belongs to
 * @param chapter - Chapter to download
 */
export async function downloadChapter(manga: Manga, chapter: Chapter) {
  if (!manga.id || !chapter.id) {
    throw new Error('Manga and chapter must have ids');
  }

  const chaptersDirectory = getChaptersDirectory(manga.id, chapter.id);
  // await saveMangaDetails(manga, false);

  await fs.makeDirectoryAsync(chaptersDirectory, { intermediates: true });
  const maxRetries = 30;
  const done = new Set<number>();
  for (let count = 0; count < maxRetries; count++) {
    const startTime = Date.now();
    const imageUrls = await getChapterImageUrls(chapter.id, false);
    const dataSource = imageUrls[0].split('data')[0];
    log(
      `Downloading chapter ${chapter.attributes?.chapter}, from ${dataSource}`
    );
    log(`${imageUrls.length - done.size} images remaining...`);
    const downloadHandles = imageUrls
      .map((url, index) => {
        if (done.has(index)) return;
        const imgExtention = url.split('.').pop();
        const path = `${chaptersDirectory}/${index}.${imgExtention}`;
        return {
          index,
          handle: fs.createDownloadResumable(url, path, {}, (progress) => {
            // log(
            //   `Downloaded ${progress.totalBytesWritten} of ${progress.totalBytesExpectedToWrite} bytes`
            // );
          }),
        };
      })
      .filter(Boolean);
    const maxTimeout = 1000 * 5;
    const timeout = setTimeout(async () => {
      await Promise.all(
        downloadHandles
          .filter(({ index }) => !done.has(index))
          .map(({ handle }) => handle.cancelAsync())
      );
      log('Timeout');
    }, maxTimeout);

    const res = await Promise.all(
      downloadHandles.map(({ index, handle }) =>
        handle.downloadAsync().then((res) => {
          if (res) done.add(index);
          return res;
        })
      )
    );
    clearTimeout(timeout);

    if (res.every((res) => res)) {
      log('Downloaded in ', Date.now() - startTime, 'ms');
      log('Downloaded chapter', chapter.id);
      break;
    } else {
      log('Failed in ', Date.now() - startTime, 'ms');
      log('Retry count: ', count);
    }
  }
}

/**
 * Downloads all chapters of a manga
 * @param mangaId - Id of manga to download
 */
export async function downloadManga(mangaId: string) {
  const throttle = throttledQueue(30, 60 * 1000, true); // 30 requests per minute

  const chapters = await getChapters(mangaId);
  if (!chapters) throw new Error('Failed to get chapters');
  const manga = await getMangaDetails(mangaId);
  if (!manga) throw new Error('Failed to get manga details');

  log('Downloading manga', mangaId);
  await saveMangaDetails(manga);
  log('Manga details saved!');

  // await Promise.all(
  //   chapters.map((chapter) => throttle(() => downloadChapter(manga, chapter)))
  // ).catch((e) => {
  //   log('Failed to download chapters', e);
  // });

  //Reverse so the most recent one is last
  for (const chapter of chapters.reverse()) {
    console.log('------------------------------------');
    await throttle(() => downloadChapter(manga, chapter));
  }

  log(`Downloaded ${chapters.length} chapters`);
  return true;
}

/**
 * Gets all downloaded manga
 */
export async function getAllDownloadedManga() {
  //Comes with .json, remove it
  const mangaDirectory = getMangaDetailsPath('').replace('.json', '');
  const { exists } = await fs.getInfoAsync(mangaDirectory);
  if (!exists) return [];
  const pathToMangaDetails = await fs.readDirectoryAsync(mangaDirectory);
  return await Promise.all(
    pathToMangaDetails.map(async (fileName) => {
      const path = `${mangaDirectory}/${fileName}`;
      const rawData = await fs.readAsStringAsync(path);
      return JSON.parse(rawData) as Manga;
    })
  );
}
