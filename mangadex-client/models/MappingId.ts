import type { MappingIdAttributes } from './MappingIdAttributes';
import type { Relationship } from './Relationship';

export type MappingId = {
	id?: string;
	type?: 'mapping_id';
	attributes?: MappingIdAttributes;
	relationships?: Array<Relationship>;
};


