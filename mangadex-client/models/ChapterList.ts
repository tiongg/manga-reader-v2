import type { Chapter } from './Chapter';

export type ChapterList = {
	result?: string;
	response?: string;
	data?: Array<Chapter>;
	limit?: number;
	offset?: number;
	total?: number;
};

