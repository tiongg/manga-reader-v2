import type { CustomListAttributes } from './CustomListAttributes';
import type { Relationship } from './Relationship';

export type CustomList = {
	id?: string;
	type?: 'custom_list';
	attributes?: CustomListAttributes;
	relationships?: Array<Relationship>;
};


