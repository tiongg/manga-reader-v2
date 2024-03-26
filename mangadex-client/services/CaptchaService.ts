
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataPostCaptchaSolve = {
                contentType?: string
requestBody?: {
captchaChallenge: string;
}
            }

export class CaptchaService {

	/**
	 * Solve Captcha
	 * Captchas can be solved explicitly through this endpoint, another way is to add a `X-Captcha-Result` header to any request. The same logic will verify the captcha and is probably more convenient because it takes one less request.
 * 
 * Authentication is optional. Captchas are tracked for both the client ip and for the user id, if you are logged in you want to send your session token but that is not required.
	 * @returns any OK: Captcha has been solved
	 * @throws ApiError
	 */
	public static postCaptchaSolve(data: TDataPostCaptchaSolve): CancelablePromise<{
result?: 'ok' | 'error';
}> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/captcha/solve',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request: Captcha challenge result was wrong, the Captcha Verification service was down or other, refer to the error message and the errorCode inside the error context`,
			},
		});
	}

}