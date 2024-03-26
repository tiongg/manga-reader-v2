import type { Relationship } from './Relationship';
import type { ScanlationGroupAttributes } from './ScanlationGroupAttributes';

export type ScanlationGroup = {
	id?: string;
	type?: 'scanlation_group';
	attributes?: ScanlationGroupAttributes;
	relationships?: Array<Relationship>;
};


