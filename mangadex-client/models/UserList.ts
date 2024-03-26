import type { User } from './User';

export type UserList = {
	result?: string;
	response?: string;
	data?: Array<User>;
	limit?: number;
	offset?: number;
	total?: number;
};

