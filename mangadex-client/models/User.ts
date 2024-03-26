import type { Relationship } from './Relationship';
import type { UserAttributes } from './UserAttributes';

export type User = {
	id?: string;
	type?: 'user';
	attributes?: UserAttributes;
	relationships?: Array<Relationship>;
};


