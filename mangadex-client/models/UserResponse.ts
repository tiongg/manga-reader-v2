import type { User } from './User';

export type UserResponse = {
	result?: 'ok';
	response?: string;
	data?: User;
};


