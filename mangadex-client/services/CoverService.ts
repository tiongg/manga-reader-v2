import type { CoverEdit } from '../models/CoverEdit';
import type { CoverList } from '../models/CoverList';
import type { CoverResponse } from '../models/CoverResponse';
import type { ReferenceExpansionCoverArt } from '../models/ReferenceExpansionCoverArt';
import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetCover = {
                /**
 * Covers ids (limited to 100 per request)
 */
idsArray?: Array<string>
includesArray?: ReferenceExpansionCoverArt
limit?: number
/**
 * Locales of cover art (limited to 100 per request)
 */
localesArray?: Array<string>
/**
 * Manga ids (limited to 100 per request)
 */
mangaArray?: Array<string>
offset?: number
order?: {
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
volume?: 'asc' | 'desc';
}
/**
 * User ids (limited to 100 per request)
 */
uploadersArray?: Array<string>
            }
export type TDataUploadCover = {
                contentType?: string
formData?: {
file?: Blob;
volume?: string | null;
description?: string;
locale?: string;
}
/**
 * Is Manga UUID on POST
 */
mangaOrCoverId: string
            }
export type TDataGetCoverId = {
                includesArray?: ReferenceExpansionCoverArt
/**
 * Is Manga UUID on POST
 */
mangaOrCoverId: string
            }
export type TDataEditCover = {
                contentType?: string
/**
 * Is Manga UUID on POST
 */
mangaOrCoverId: string
/**
 * The size of the body is limited to 2KB.
 */
requestBody?: CoverEdit
            }
export type TDataDeleteCover = {
                /**
 * Is Manga UUID on POST
 */
mangaOrCoverId: string
            }

export class CoverService {

	/**
	 * CoverArt list
	 * @returns CoverList OK
	 * @throws ApiError
	 */
	public static getCover(data: TDataGetCover = {}): CancelablePromise<CoverList> {
		const {
idsArray,
includesArray,
limit = 10,
localesArray,
mangaArray,
offset,
order,
uploadersArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/cover',
			query: {
				limit, offset, 'manga[]': mangaArray, 'ids[]': idsArray, 'uploaders[]': uploadersArray, 'locales[]': localesArray, order, 'includes[]': includesArray
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Upload Cover
	 * @returns CoverResponse OK
	 * @throws ApiError
	 */
	public static uploadCover(data: TDataUploadCover): CancelablePromise<CoverResponse> {
		const {
contentType = 'multipart/form-data',
formData,
mangaOrCoverId,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/cover/{mangaOrCoverId}',
			path: {
				mangaOrCoverId
			},
			headers: {
				'Content-Type': contentType
			},
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Get Cover
	 * @returns CoverResponse OK
	 * @throws ApiError
	 */
	public static getCoverId(data: TDataGetCoverId): CancelablePromise<CoverResponse> {
		const {
includesArray,
mangaOrCoverId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/cover/{mangaOrCoverId}',
			path: {
				mangaOrCoverId
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
				404: `CoverArt not found`,
			},
		});
	}

	/**
	 * Edit Cover
	 * @returns CoverResponse OK
	 * @throws ApiError
	 */
	public static editCover(data: TDataEditCover): CancelablePromise<CoverResponse> {
		const {
contentType = 'application/json',
mangaOrCoverId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/cover/{mangaOrCoverId}',
			path: {
				mangaOrCoverId
			},
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
	 * Delete Cover
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteCover(data: TDataDeleteCover): CancelablePromise<Response> {
		const {
mangaOrCoverId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/cover/{mangaOrCoverId}',
			path: {
				mangaOrCoverId
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

}