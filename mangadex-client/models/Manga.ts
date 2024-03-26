import type { MangaAttributes } from './MangaAttributes';
import type { Relationship } from './Relationship';

export type Manga = {
	id?: string;
	type?: 'manga';
	attributes?: MangaAttributes;
	relationships?: Array<Relationship>;
};


