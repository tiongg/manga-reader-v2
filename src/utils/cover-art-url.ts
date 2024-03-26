import { Manga } from 'mangadex-client';
import { getRelationship } from './get-relationship';
import { CoverArtRelation } from './missing-types';

const COVER_BASE_URL = 'https://uploads.mangadex.org/covers';

export function getCoverArtUrl(mangaId: string, coverArtFileName: string) {
  return `${COVER_BASE_URL}/${mangaId}/${coverArtFileName}`;
}

/**
 * Assumes manga has a cover art relationship loaded
 * @param manga - Manga to get art for
 */
export function getCoverArtUrlFromManga(manga: Manga) {
  const coverArtFileName = getRelationship<CoverArtRelation>(manga, 'cover_art')
    ?.attributes?.fileName;
  return getCoverArtUrl(manga.id!, coverArtFileName!);
}
