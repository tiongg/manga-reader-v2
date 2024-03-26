import type { Tag } from './Tag';

export type TagResponse = {
	result?: string;
	response?: string;
	data?: Array<Tag>;
	limit?: number;
	offset?: number;
	total?: number;
};

