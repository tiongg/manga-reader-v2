import { Chapter } from 'mangadex-client';

/**
 * Gets chapter title from chapter object.
 *
 * Returns in the format of "Vol. {volume}, Chapter {chapter} - {title}"
 * @param chapter - Chapter to get title for
 * @returns string - Chapter title
 */
export function getChapterTitle(chapter: Chapter) {
  const { volume, title, chapter: chapterNumber } = chapter.attributes!;

  //If no chapter number, it's a oneshot
  if (!chapterNumber) {
    return 'Oneshot';
  }
  return `${volume ? `Vol. ${volume}, ` : ''}Chapter ${chapterNumber}${
    title ? ` - ${title}` : ''
  }`;
}
