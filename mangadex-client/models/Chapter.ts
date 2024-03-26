import type { ChapterAttributes } from './ChapterAttributes';
import type { Relationship } from './Relationship';

export type Chapter = {
	id?: string;
	type?: 'chapter';
	attributes?: ChapterAttributes;
	relationships?: Array<Relationship>;
};


