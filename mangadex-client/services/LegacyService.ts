import type { MappingIdBody } from '../models/MappingIdBody';
import type { MappingIdResponse } from '../models/MappingIdResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataPostLegacyMapping = {
                contentType?: string
/**
 * The size of the body is limited to 10KB.
 */
requestBody?: MappingIdBody
            }

export class LegacyService {

	/**
	 * Legacy ID mapping
	 * @returns MappingIdResponse This response will give you an array of mappings of resource identifiers ; the `data.attributes.newId` field corresponds to the new UUID.
	 * @throws ApiError
	 */
	public static postLegacyMapping(data: TDataPostLegacyMapping): CancelablePromise<MappingIdResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/legacy/mapping',
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