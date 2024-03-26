import {
  Author,
  Chapter,
  Manga,
  ReferenceExpansionAuthor,
  ReferenceExpansionChapter,
  ReferenceExpansionCoverArt,
  ReferenceExpansionManga,
  Relationship,
} from 'mangadex-client';

//Manga
export function getRelationship<T extends Relationship>(
  item: Manga,
  type: ReferenceExpansionManga[number]
): T;

//Chapter
export function getRelationship<T extends Relationship>(
  item: Chapter,
  type: ReferenceExpansionChapter[number]
): T;

//Author
export function getRelationship<T extends Relationship>(
  item: Author,
  type: ReferenceExpansionAuthor[number]
): T;

export function getRelationship<
  T extends Relationship,
  TItem extends { relationships: Relationship[] }
>(item: TItem, type: string) {
  return item.relationships.find(r => r.type === type) as T;
}
