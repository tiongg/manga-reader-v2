import type { MangaRelation } from './MangaRelation';

export type MangaRelationResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: MangaRelation;
};


