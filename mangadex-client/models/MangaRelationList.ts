import type { MangaRelation } from './MangaRelation';

export type MangaRelationList = {
	result?: string;
	response?: string;
	data?: Array<MangaRelation>;
	limit?: number;
	offset?: number;
	total?: number;
};

