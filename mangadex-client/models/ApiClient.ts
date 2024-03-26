import type { ApiClientAttributes } from './ApiClientAttributes';
import type { Relationship } from './Relationship';

export type ApiClient = {
	id?: string;
	type?: 'api_client';
	attributes?: ApiClientAttributes;
	relationships?: Array<Relationship>;
};


