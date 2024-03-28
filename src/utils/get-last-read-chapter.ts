import { Chapter } from 'mangadex-client';

/**
 * Gets the last read chapter for a manga, using read markers
 * @param chapters - List of all chapters for a manga, most recent first
 * @param readMarkers - Read markers for a manga
 */
export function getLastReadChapter(
  chapters: Chapter[],
  readMarkers: Set<string>
) {
  return chapters.find((chapter) => readMarkers.has(chapter.id!));
}
