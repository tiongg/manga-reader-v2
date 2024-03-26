import type { CheckResponse } from '../models/CheckResponse';
import type { Login } from '../models/Login';
import type { LoginResponse } from '../models/LoginResponse';
import type { LogoutResponse } from '../models/LogoutResponse';
import type { RefreshResponse } from '../models/RefreshResponse';
import type { RefreshToken } from '../models/RefreshToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataPostAuthLogin = {
                contentType?: string
/**
 * The size of the body is limited to 2KB.
 */
requestBody?: Login
            }
export type TDataPostAuthRefresh = {
                contentType?: string
/**
 * The size of the body is limited to 2KB.
 */
requestBody?: RefreshToken
            }

export class AuthenticationService {

	/**
	 * @deprecated
	 * Login
	 * @returns LoginResponse OK
	 * @throws ApiError
	 */
	public static postAuthLogin(data: TDataPostAuthLogin): CancelablePromise<LoginResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/auth/login',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
				401: `Unauthorized`,
			},
		});
	}

	/**
	 * Check the set of permissions associated with the current token
	 * The returned list of permissions is computed depending on the generic role permissions that the token user has, their personal overrides, and the OpenID scopes of the token (we do not offer granular token permissions yet)
 * 
	 * @returns CheckResponse OK
	 * @throws ApiError
	 */
	public static getAuthCheck(): CancelablePromise<CheckResponse> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/auth/check',
		});
	}

	/**
	 * @deprecated
	 * Logout
	 * @returns LogoutResponse OK
	 * @throws ApiError
	 */
	public static postAuthLogout(): CancelablePromise<LogoutResponse> {
				return __request(OpenAPI, {
			method: 'POST',
			url: '/auth/logout',
			errors: {
				503: `Service Unavailable`,
			},
		});
	}

	/**
	 * @deprecated
	 * Refresh token
	 * @returns RefreshResponse OK
	 * @throws ApiError
	 */
	public static postAuthRefresh(data: TDataPostAuthRefresh): CancelablePromise<RefreshResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/auth/refresh',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
				401: `Unauthorized`,
				403: `Forbidden`,
			},
		});
	}

}