import { Manga } from 'mangadex-client';
import { localeOrFirst } from './locale-or-first';

/**
 * Returns english title of manga, else the first title
 * @param manga - Manga to get title for
 */
export function getMangaTitle(manga: Manga) {
  const titles = manga.attributes?.title!;
  const mangaTitle = localeOrFirst(titles);
  return mangaTitle;
}
