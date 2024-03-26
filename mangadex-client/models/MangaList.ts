import type { Manga } from './Manga';

export type MangaList = {
	result?: string;
	response?: string;
	data?: Array<Manga>;
	limit?: number;
	offset?: number;
	total?: number;
};

