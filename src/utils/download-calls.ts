// Cached service calls
// Returns the same data as the service call, but with cached data
import * as fs from 'expo-file-system';
import { Chapter, Manga } from 'mangadex-client';
import throttledQueue from 'throttled-queue';

import {
  getChapterImageUrls,
  getChapters,
  getMangaDetails,
} from './service-calls';

// Consider cache directory instead
//THIS ENDS WITH A TRAILING /
const DOWNLOAD_PREFIX = `${fs.documentDirectory}md-downloads`;
const LOG_CACHE = true;

function log(...args: any[]) {
  if (!LOG_CACHE) return;
  console.log('[Cache]', ...args);
}

/**
 * Clears downloads directory
 */
export async function clearDownloads() {
  await fs.deleteAsync(DOWNLOAD_PREFIX);
  log('Downloads cleared');
  await ensureDirectoryExist(getMangaDetailsPath('dummy'));
}

/**
 * Ensures directory exists for given path
 * @param path - Path that should exist
 */
async function ensureDirectoryExist(path: string) {
  const dirPath = path.split('/').slice(0, -1).join('/');
  const { exists } = await fs.getInfoAsync(dirPath);
  if (exists) return;
  await fs.makeDirectoryAsync(path, { intermediates: true });
  log('Created directory', dirPath);
  return ensureDirectoryExist(path);
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
  const { exists, ...rest } = await fs.getInfoAsync(cachePath);
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

  await saveMangaDetails(manga, false);

  await fs.makeDirectoryAsync(chaptersDirectory, { intermediates: true });
  const imageUrls = await getChapterImageUrls(chapter.id, false);
  await Promise.all(
    imageUrls.map((url, index) => {
      const imgExtention = url.split('.').pop();
      const path = `${chaptersDirectory}/${index}.${imgExtention}`;
      return fs.downloadAsync(url, path);
    })
  );
}

/**
 * Downloads all chapters of a manga
 * @param mangaId - Id of manga to download
 */
export async function downloadManga(mangaId: string) {
  const throttle = throttledQueue(5, 1000, true); // at most 5 requests per second.

  const chapters = await getChapters(mangaId);
  if (!chapters) throw new Error('Failed to get chapters');
  const manga = await getMangaDetails(mangaId);
  if (!manga) throw new Error('Failed to get manga details');

  log('Downloading manga', mangaId);
  await saveMangaDetails(manga);
  log('Manga details saved!');

  await Promise.all(
    chapters.map((chapter) => throttle(() => downloadChapter(manga, chapter)))
  );
  log(`Downloaded ${chapters.length} chapters`);
}
