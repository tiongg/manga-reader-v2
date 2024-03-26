
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';



export class InfrastructureService {

	/**
	 * Ping healthcheck
	 * Returns a plaintext response containing only the word "pong" if the API is healthy
	 * @returns string Pong
	 * @throws ApiError
	 */
	public static getPing(): CancelablePromise<string> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/ping',
		});
	}

}