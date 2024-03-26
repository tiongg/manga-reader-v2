

export type CheckResponse = {
	result?: string;
	isAuthenticated?: boolean;
	roles?: Array<string>;
	permissions?: Array<string>;
};

