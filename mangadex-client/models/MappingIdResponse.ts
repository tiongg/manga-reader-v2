import type { MappingId } from './MappingId';

export type MappingIdResponse = {
	result?: string;
	response?: string;
	data?: Array<MappingId>;
	limit?: number;
	offset?: number;
	total?: number;
};

