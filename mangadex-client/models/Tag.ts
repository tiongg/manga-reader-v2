import type { Relationship } from './Relationship';
import type { TagAttributes } from './TagAttributes';

export type Tag = {
	id?: string;
	type?: 'tag';
	attributes?: TagAttributes;
	relationships?: Array<Relationship>;
};


