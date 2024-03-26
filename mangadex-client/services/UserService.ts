import type { Response } from '../models/Response';
import type { UserList } from '../models/UserList';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetUser = {
                /**
 * User ids (limited to 100 per request)
 */
idsArray?: Array<string>
limit?: number
offset?: number
order?: {
username?: 'asc' | 'desc';
}
username?: string
            }
export type TDataGetUserId = {
                /**
 * User ID
 */
id: string
            }
export type TDataDeleteUserId = {
                /**
 * User ID
 */
id: string
            }
export type TDataPostUserDeleteCode = {
                /**
 * User delete code
 */
code: string
            }
export type TDataPostUserPassword = {
                contentType?: string
requestBody?: {
oldPassword: string;
newPassword: string;
}
            }
export type TDataPostUserEmail = {
                contentType?: string
requestBody?: {
email: string;
}
            }

export class UserService {

	/**
	 * User list
	 * @returns UserList OK
	 * @throws ApiError
	 */
	public static getUser(data: TDataGetUser = {}): CancelablePromise<UserList> {
		const {
idsArray,
limit = 10,
offset,
order,
username,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user',
			query: {
				limit, offset, 'ids[]': idsArray, username, order
			},
		});
	}

	/**
	 * Get User
	 * @returns UserResponse OK
	 * @throws ApiError
	 */
	public static getUserId(data: TDataGetUserId): CancelablePromise<UserResponse> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/{id}',
			path: {
				id
			},
		});
	}

	/**
	 * @deprecated
	 * Delete User
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteUserId(data: TDataDeleteUserId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/user/{id}',
			path: {
				id
			},
		});
	}

	/**
	 * @deprecated
	 * Approve User deletion
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postUserDeleteCode(data: TDataPostUserDeleteCode): CancelablePromise<Response> {
		const {
code,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/user/delete/{code}',
			path: {
				code
			},
		});
	}

	/**
	 * @deprecated
	 * Update User password
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postUserPassword(data: TDataPostUserPassword): CancelablePromise<Response> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/user/password',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * @deprecated
	 * Update User email
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postUserEmail(data: TDataPostUserEmail): CancelablePromise<Response> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/user/email',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Logged User details
	 * @returns UserResponse OK
	 * @throws ApiError
	 */
	public static getUserMe(): CancelablePromise<UserResponse> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/user/me',
		});
	}

}