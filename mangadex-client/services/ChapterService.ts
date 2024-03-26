import type { ChapterEdit } from '../models/ChapterEdit';
import type { ChapterList } from '../models/ChapterList';
import type { ChapterResponse } from '../models/ChapterResponse';
import type { ReferenceExpansionChapter } from '../models/ReferenceExpansionChapter';
import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetChapter = {
                chapter?: string | Array<string>
contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
createdAtSince?: string
excludedGroupsArray?: Array<string>
excludedOriginalLanguageArray?: Array<string>
excludedUploadersArray?: Array<string>
groupsArray?: Array<string>
/**
 * Chapter ids (limited to 100 per request)
 */
idsArray?: Array<string>
includeEmptyPages?: 0 | 1
includeExternalUrl?: 0 | 1
includeFuturePublishAt?: 0 | 1
includeFutureUpdates?: '0' | '1'
includes?: Array<'manga' | 'scanlation_group' | 'user'>
limit?: number
manga?: string
offset?: number
order?: {
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
publishAt?: 'asc' | 'desc';
readableAt?: 'asc' | 'desc';
volume?: 'asc' | 'desc';
chapter?: 'asc' | 'desc';
}
originalLanguageArray?: Array<string>
publishAtSince?: string
title?: string
translatedLanguageArray?: Array<string>
updatedAtSince?: string
uploader?: string | Array<string>
volumeArray?: string | Array<string>
            }
export type TDataGetChapterId = {
                /**
 * Chapter ID
 */
id: string
includesArray?: ReferenceExpansionChapter
            }
export type TDataPutChapterId = {
                contentType?: string
/**
 * Chapter ID
 */
id: string
/**
 * The size of the body is limited to 32KB.
 */
requestBody?: ChapterEdit
            }
export type TDataDeleteChapterId = {
                /**
 * Chapter ID
 */
id: string
            }

export class ChapterService {

	/**
	 * Chapter list
	 * Chapter list. If you want the Chapters of a given Manga, please check the feed endpoints.
	 * @returns ChapterList Chapter list
	 * @throws ApiError
	 */
	public static getChapter(data: TDataGetChapter = {}): CancelablePromise<ChapterList> {
		const {
chapter,
contentRatingArray,
createdAtSince,
excludedGroupsArray,
excludedOriginalLanguageArray,
excludedUploadersArray,
groupsArray,
idsArray,
includeEmptyPages,
includeExternalUrl,
includeFuturePublishAt,
includeFutureUpdates = '1',
includes,
limit = 10,
manga,
offset,
order,
originalLanguageArray,
publishAtSince,
title,
translatedLanguageArray,
updatedAtSince,
uploader,
volumeArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/chapter',
			query: {
				limit, offset, 'ids[]': idsArray, title, 'groups[]': groupsArray, uploader, manga, 'volume[]': volumeArray, chapter, 'translatedLanguage[]': translatedLanguageArray, 'originalLanguage[]': originalLanguageArray, 'excludedOriginalLanguage[]': excludedOriginalLanguageArray, 'contentRating[]': contentRatingArray, 'excludedGroups[]': excludedGroupsArray, 'excludedUploaders[]': excludedUploadersArray, includeFutureUpdates, includeEmptyPages, includeFuturePublishAt, includeExternalUrl, createdAtSince, updatedAtSince, publishAtSince, order, includes
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Get Chapter
	 * @returns ChapterResponse OK
	 * @throws ApiError
	 */
	public static getChapterId(data: TDataGetChapterId): CancelablePromise<ChapterResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/chapter/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `Chapter not found`,
			},
		});
	}

	/**
	 * Update Chapter
	 * @returns ChapterResponse OK
	 * @throws ApiError
	 */
	public static putChapterId(data: TDataPutChapterId): CancelablePromise<ChapterResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/chapter/{id}',
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
	 * Delete Chapter
	 * @returns Response Chapter has been deleted.
	 * @throws ApiError
	 */
	public static deleteChapterId(data: TDataDeleteChapterId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/chapter/{id}',
			path: {
				id
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}