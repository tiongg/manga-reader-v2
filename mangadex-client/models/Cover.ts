import type { CoverAttributes } from './CoverAttributes';
import type { Relationship } from './Relationship';

export type Cover = {
	id?: string;
	type?: 'cover_art';
	attributes?: CoverAttributes;
	relationships?: Array<Relationship>;
};


