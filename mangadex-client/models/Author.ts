import type { AuthorAttributes } from './AuthorAttributes';
import type { Relationship } from './Relationship';

export type Author = {
	id?: string;
	type?: 'author';
	attributes?: AuthorAttributes;
	relationships?: Array<Relationship>;
};


