import type { Author } from './Author';

export type AuthorList = {
	result?: string;
	response?: string;
	data?: Array<Author>;
	limit?: number;
	offset?: number;
	total?: number;
};

