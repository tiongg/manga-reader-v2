// Download service calls
import * as fs from 'expo-file-system';
import { Chapter, Manga } from 'mangadex-client';
import throttledQueue from 'throttled-queue';

import { queryClient } from '@/config/query-client';
import { orderWithReference } from './order-with-reference';
import {
  getChapterImageUrls,
  getChapterList,
  getMangaDetails,
} from './service-calls';

/* FOLDER STRUCTURE
documentDirectory/md-downloads/
  manga/
    mangaId.json  - Manga details for mangaId
  chapter/
    mangaId/  - Folder for mangaId
      chapters.json - List of downlaoded chapters for mangaId
      chapterId/  - Folder for chapterId
        0.jpg|png
        1.jpg|png
        ...
        n.jpg|png
*/

// Consider cache directory instead
//THIS ENDS WITH A TRAILING /
const DOWNLOAD_PREFIX = `${fs.documentDirectory}md-downloads`;
const CHAPTER_DETAILS_JSON = 'chapters.json';
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

//Downloaded manga details path for mangaId
function getMangaDetailsPath(mangaId: string) {
  return `${DOWNLOAD_PREFIX}/manga/${mangaId}.json`;
}

//Folder containing downloaded chapter images
function getChaptersDirectory(mangaId: string, chapterId: string) {
  return `${DOWNLOAD_PREFIX}/chapter/${mangaId}/${chapterId}`;
}

//Downloaded chapters path for mangaId
function getDownloadedChaptersJsonPath(mangaId: string) {
  return `${getChaptersDirectory(mangaId, '')}${CHAPTER_DETAILS_JSON}`;
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
 * Downloads a chapter
 * @param manga - Manga chapter belongs to
 * @param chapter - Chapter to download
 * @returns boolean - true if download was successful
 */
async function downloadChapter(
  manga: Manga,
  chapter: Chapter,
  onDownloadProgress: (current: number, outOf: number) => void
) {
  if (!manga.id || !chapter.id) {
    throw new Error('Manga and chapter must have ids');
  }

  const chaptersDirectory = getChaptersDirectory(manga.id, chapter.id);

  await fs.makeDirectoryAsync(chaptersDirectory, { intermediates: true });
  const maxRetries = 30;
  const downloadedPages = new Set<number>();
  for (let count = 0; count < maxRetries; count++) {
    const startTime = Date.now();
    const imageUrls = await getChapterImageUrls(
      chapter.id,
      false,
      //this node works very well
      'https://cmdxd98sb0x3yprd.mangadex.network'
    );
    const dataSource = imageUrls[0].split('data')[0];
    let prevDownloadedCount = downloadedPages.size;
    log(
      `Downloading chapter ${chapter.attributes?.chapter}, from ${dataSource}`
    );
    log(`${imageUrls.length - downloadedPages.size} images remaining...`);
    const downloadHandles = imageUrls
      .map((url, index) => {
        if (downloadedPages.has(index)) return;
        const imgExtention = url.split('.').pop();
        const path = `${chaptersDirectory}/${index}.${imgExtention}`;
        return {
          index,
          handle: fs.createDownloadResumable(url, path),
        };
      })
      .filter(Boolean);
    const maxTimeout = 1000 * 5;
    const timeout = setInterval(async () => {
      const downloadedCount = downloadedPages.size;
      //No progress this cycle
      if (downloadedCount === prevDownloadedCount) {
        await Promise.all(
          downloadHandles
            .filter(({ index }) => !downloadedPages.has(index))
            .map(({ handle }) => handle.cancelAsync())
        );
        log('Timeout');
      } else {
        //Got progress, continue using this node
        prevDownloadedCount = downloadedCount;
      }
    }, maxTimeout);

    onDownloadProgress(downloadedPages.size, imageUrls.length);
    const res = await Promise.all(
      downloadHandles.map(({ index, handle }) =>
        handle.downloadAsync().then((res) => {
          if (res) {
            downloadedPages.add(index);
            onDownloadProgress(downloadedPages.size, imageUrls.length);
          }
          return res;
        })
      )
    );
    clearInterval(timeout);

    if (res.every((res) => res)) {
      log('Downloaded in ', Date.now() - startTime, 'ms');
      log('Downloaded chapter', chapter.id);
      return true;
    } else {
      log('Failed in ', Date.now() - startTime, 'ms');
      log('Retry count: ', count);
    }
  }
  return false;
}

/**
 * Downloads all chapters of a manga
 * @param mangaId - Id of manga to download
 */
export async function downloadManga(
  mangaId: string,
  onDownloadProgress: (
    chapterId: string,
    current: number,
    outOf: number
  ) => void = () => {}
) {
  const downloadThrottle = throttledQueue(30, 60 * 1000, true); // 30 requests per minute

  const chapters = await getChapterList(mangaId);
  if (!chapters) throw new Error('Failed to get chapters');
  const manga = await getMangaDetails(mangaId);
  if (!manga) throw new Error('Failed to get manga details');

  log('Downloading manga', mangaId);
  await saveMangaDetails(manga);
  log('Manga details saved!');

  //Successfully downloaded chapters
  const downloadedChapterDetails = await getDownloadedChapterList(mangaId);
  const originalLength = downloadedChapterDetails.length;

  //Reverse so the most recent one is last
  for (const chapter of chapters.reverse()) {
    //Skip if already downloaded
    if (downloadedChapterDetails.some((c) => c.id === chapter.id)) {
      continue;
    }

    console.log('------------------------------------');
    const success = await downloadThrottle(() =>
      downloadChapter(manga, chapter, (current, outOf) => {
        onDownloadProgress(chapter.id!, current, outOf);
      })
    );
    //Add to downloaded list
    if (success) {
      downloadedChapterDetails.push(chapter);
    }
  }

  //Sort downloaded chapters
  const sortedDownloads = orderWithReference(
    downloadedChapterDetails,
    (c) => c.id!,
    chapters.reverse().map((c) => c.id!)
  );

  log(
    `Downloaded ${downloadedChapterDetails.length - originalLength} chapters!`
  );

  //Save downloaded chapters list
  const downloadedChaptersJsonPath = getDownloadedChaptersJsonPath(mangaId);
  await ensureDirectoryExist(downloadedChaptersJsonPath);
  await fs.writeAsStringAsync(
    downloadedChaptersJsonPath,
    JSON.stringify(sortedDownloads)
  );
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

/**
 * Gets manga details for a downloaded manga
 * @param mangaId - Manga to get details for
 */
export async function getDownloadedMangaDetails(mangaId: string) {
  const mangaDetailsPath = getMangaDetailsPath(mangaId);
  const { exists } = await fs.getInfoAsync(mangaDetailsPath);
  if (!exists) return;
  const rawData = await fs.readAsStringAsync(mangaDetailsPath);
  return JSON.parse(rawData) as Manga;
}

/**
 * Gets chapter image urls for a downloaded chapter
 * @param chapterId - Chapter to get images for
 * @param mangaId - Manga id of chapter
 * @returns string[] - Chapter image urls
 */
export async function getDownloadedChapterImageUrls(
  chapterId: string,
  mangaId: string
) {
  log('Using downloaded chapter images');
  const chapterDirectory = getChaptersDirectory(mangaId, chapterId);
  const { exists } = await fs.getInfoAsync(chapterDirectory);
  if (!exists) return [];
  const urls = (await fs.readDirectoryAsync(chapterDirectory))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((url) => `${chapterDirectory}/${url}`);
  return urls;
}

/**
 * Gets downloaded chapter list
 * @param mangaId - Manga to get downloaded chapters for
 */
export async function getDownloadedChapterList(
  mangaId: string
): Promise<Chapter[]> {
  const chapterListPath = getDownloadedChaptersJsonPath(mangaId);
  const { exists } = await fs.getInfoAsync(chapterListPath);
  if (!exists) return [];
  const rawData = await fs.readAsStringAsync(chapterListPath);
  return JSON.parse(rawData) as Chapter[];
}

/**
 * Gets read markers for a downloaded manga
 * @param mangaId - Manga to get read markers for
 */
export async function getDownloadedReadMarkers(mangaId: string) {
  //TODO
  return new Set<string>();
}
