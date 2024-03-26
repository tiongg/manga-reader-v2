import type { Chapter } from './Chapter';

export type ChapterResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Chapter;
};


