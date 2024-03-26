import type { Cover } from './Cover';

export type CoverList = {
	result?: string;
	response?: string;
	data?: Array<Cover>;
	limit?: number;
	offset?: number;
	total?: number;
};

