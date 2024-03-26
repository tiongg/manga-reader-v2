import type { MangaRelationAttributes } from './MangaRelationAttributes';
import type { Relationship } from './Relationship';

export type MangaRelation = {
	id?: string;
	type?: 'manga_relation';
	attributes?: MangaRelationAttributes;
	relationships?: Array<Relationship>;
};


