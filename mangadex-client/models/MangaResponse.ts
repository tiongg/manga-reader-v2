import type { Manga } from './Manga';

export type MangaResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Manga;
};


