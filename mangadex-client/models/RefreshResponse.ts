

export type RefreshResponse = {
	result: 'ok' | 'error';
	token?: {
session?: string;
refresh?: string;
};
	message?: string;
};


