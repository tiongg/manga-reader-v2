import type { ApiClient } from './ApiClient';

export type ApiClientList = {
	result?: string;
	response?: string;
	data?: Array<ApiClient>;
	limit?: number;
	offset?: number;
	total?: number;
};

