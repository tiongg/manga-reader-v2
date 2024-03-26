import type { AccountActivateResponse } from '../models/AccountActivateResponse';
import type { CreateAccount } from '../models/CreateAccount';
import type { RecoverCompleteBody } from '../models/RecoverCompleteBody';
import type { SendAccountActivationCode } from '../models/SendAccountActivationCode';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetAccountAvailable = {
                /**
 * Username to check for avaibility
 */
username: string
            }
export type TDataPostAccountCreate = {
                contentType?: string
/**
 * The size of the body is limited to 4KB.
 */
requestBody?: CreateAccount
            }
export type TDataGetAccountActivateCode = {
                code: string
            }
export type TDataPostAccountActivateResend = {
                contentType?: string
/**
 * The size of the body is limited to 1KB.
 */
requestBody?: SendAccountActivationCode
            }
export type TDataPostAccountRecover = {
                contentType?: string
/**
 * The size of the body is limited to 1KB.
 */
requestBody?: SendAccountActivationCode
            }
export type TDataPostAccountRecoverCode = {
                code: string
contentType?: string
/**
 * The size of the body is limited to 2KB.
 */
requestBody?: RecoverCompleteBody
            }

export class AccountService {

	/**
	 * @deprecated
	 * Account username available
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getAccountAvailable(data: TDataGetAccountAvailable): CancelablePromise<{
available?: boolean;
}> {
		const {
username,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/account/available',
			query: {
				username
			},
			errors: {
				403: `Forbidden`,
			},
		});
	}

	/**
	 * @deprecated
	 * Create Account
	 * @returns UserResponse Created
	 * @throws ApiError
	 */
	public static postAccountCreate(data: TDataPostAccountCreate): CancelablePromise<UserResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/account/create',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * @deprecated
	 * Activate account
	 * @returns AccountActivateResponse OK
	 * @throws ApiError
	 */
	public static getAccountActivateCode(data: TDataGetAccountActivateCode): CancelablePromise<AccountActivateResponse> {
		const {
code,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/account/activate/{code}',
			path: {
				code
			},
			errors: {
				400: `Bad Request`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * @deprecated
	 * Resend Activation code
	 * @returns AccountActivateResponse OK
	 * @throws ApiError
	 */
	public static postAccountActivateResend(data: TDataPostAccountActivateResend): CancelablePromise<AccountActivateResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/account/activate/resend',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * @deprecated
	 * Recover given Account
	 * You can only request Account Recovery once per Hour for the same Email Address
	 * @returns AccountActivateResponse OK
	 * @throws ApiError
	 */
	public static postAccountRecover(data: TDataPostAccountRecover): CancelablePromise<AccountActivateResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/account/recover',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * @deprecated
	 * Complete Account recover
	 * @returns AccountActivateResponse OK
	 * @throws ApiError
	 */
	public static postAccountRecoverCode(data: TDataPostAccountRecoverCode): CancelablePromise<AccountActivateResponse> {
		const {
code,
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/account/recover/{code}',
			path: {
				code
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request`,
			},
		});
	}

}