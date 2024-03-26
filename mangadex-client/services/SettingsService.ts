
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataPostSettingsTemplate = {
                requestBody?: Record<string, unknown>
            }
export type TDataGetSettingsTemplateVersion = {
                version: string
            }
export type TDataPostSettings = {
                requestBody?: {
/**
 * A JSON object that can be validated against the lastest available template
 */
settings?: Record<string, unknown>;
/**
 * Format: 2022-03-14T13:19:37
 */
updatedAt?: string;
}
            }

export class SettingsService {

	/**
	 * Get latest Settings template
	 * @returns unknown OK
	 * @throws ApiError
	 */
	public static getSettingsTemplate(): CancelablePromise<Record<string, unknown>> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/settings/template',
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

	/**
	 * Create Settings template
	 * @returns unknown OK
	 * @throws ApiError
	 */
	public static postSettingsTemplate(data: TDataPostSettingsTemplate = {}): CancelablePromise<Record<string, unknown>> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/settings/template',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Get Settings template by version id
	 * @returns unknown OK
	 * @throws ApiError
	 */
	public static getSettingsTemplateVersion(data: TDataGetSettingsTemplateVersion): CancelablePromise<Record<string, unknown>> {
		const {
version,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/settings/template/{version}',
			path: {
				version
			},
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

	/**
	 * Get an User Settings
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getSettings(): CancelablePromise<{
result?: string;
updatedAt?: string;
/**
 * Settings that were validated by linked template
 */
settings?: Record<string, unknown>;
/**
 * Settings template UUID
 */
template?: string;
}> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/settings',
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

	/**
	 * Create or update an User Settings
	 * @returns any OK
	 * @throws ApiError
	 */
	public static postSettings(data: TDataPostSettings = {}): CancelablePromise<{
result?: string;
updatedAt?: string;
/**
 * Settings that were validated against the linked template
 */
settings?: Record<string, unknown>;
/**
 * Settings template UUID
 */
template?: string;
}> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/settings',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

}