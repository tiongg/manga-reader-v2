import type { CustomList } from './CustomList';

export type CustomListResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: CustomList;
};


