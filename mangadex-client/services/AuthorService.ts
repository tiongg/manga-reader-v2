import type { AuthorCreate } from '../models/AuthorCreate';
import type { AuthorEdit } from '../models/AuthorEdit';
import type { AuthorList } from '../models/AuthorList';
import type { AuthorResponse } from '../models/AuthorResponse';
import type { ReferenceExpansionAuthor } from '../models/ReferenceExpansionAuthor';
import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetAuthor = {
                /**
 * Author ids (limited to 100 per request)
 */
idsArray?: Array<string>
includesArray?: ReferenceExpansionAuthor
limit?: number
name?: string
offset?: number
order?: {
name?: 'asc' | 'desc';
}
            }
export type TDataPostAuthor = {
                contentType?: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: AuthorCreate
            }
export type TDataGetAuthorId = {
                /**
 * Author ID
 */
id: string
includesArray?: ReferenceExpansionAuthor
            }
export type TDataPutAuthorId = {
                contentType?: string
/**
 * Author ID
 */
id: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: AuthorEdit
            }
export type TDataDeleteAuthorId = {
                /**
 * Author ID
 */
id: string
            }

export class AuthorService {

	/**
	 * Author list
	 * @returns AuthorList OK
	 * @throws ApiError
	 */
	public static getAuthor(data: TDataGetAuthor = {}): CancelablePromise<AuthorList> {
		const {
idsArray,
includesArray,
limit = 10,
name,
offset,
order,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/author',
			query: {
				limit, offset, 'ids[]': idsArray, name, order, 'includes[]': includesArray
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Create Author
	 * @returns AuthorResponse OK
	 * @throws ApiError
	 */
	public static postAuthor(data: TDataPostAuthor): CancelablePromise<AuthorResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/author',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Get Author
	 * @returns AuthorResponse OK
	 * @throws ApiError
	 */
	public static getAuthorId(data: TDataGetAuthorId): CancelablePromise<AuthorResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/author/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `Author no content`,
			},
		});
	}

	/**
	 * Update Author
	 * @returns AuthorResponse OK
	 * @throws ApiError
	 */
	public static putAuthorId(data: TDataPutAuthorId): CancelablePromise<AuthorResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/author/{id}',
			path: {
				id
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Delete Author
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteAuthorId(data: TDataDeleteAuthorId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/author/{id}',
			path: {
				id
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}