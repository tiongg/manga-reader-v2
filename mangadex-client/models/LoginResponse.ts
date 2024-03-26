

export type LoginResponse = {
	result?: 'ok' | 'error';
	token?: {
session?: string;
refresh?: string;
};
};


