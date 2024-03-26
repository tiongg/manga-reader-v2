import type { Error } from './Error';

export type ErrorResponse = {
	result?: string;
	errors?: Array<Error>;
};

