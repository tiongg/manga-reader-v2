import type { LocalizedString } from './LocalizedString';

export type TagAttributes = {
	name?: LocalizedString;
	description?: LocalizedString;
	group?: 'content' | 'format' | 'genre' | 'theme';
	version?: number;
};


