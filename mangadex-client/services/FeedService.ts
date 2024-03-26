import type { ChapterList } from '../models/ChapterList';
import type { ReferenceExpansionChapter } from '../models/ReferenceExpansionChapter';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetUserFollowsMangaFeed = {
                contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
createdAtSince?: string
excludedGroupsArray?: Array<string>
excludedOriginalLanguageArray?: Array<string>
excludedUploadersArray?: Array<string>
includeEmptyPages?: 0 | 1
includeExternalUrl?: 0 | 1
includeFuturePublishAt?: 0 | 1
includeFutureUpdates?: '0' | '1'
includesArray?: ReferenceExpansionChapter
limit?: number
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
translatedLanguageArray?: Array<string>
updatedAtSince?: string
            }
export type TDataGetListIdFeed = {
                contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
createdAtSince?: string
excludedGroupsArray?: Array<string>
excludedOriginalLanguageArray?: Array<string>
excludedUploadersArray?: Array<string>
id: string
includeEmptyPages?: 0 | 1
includeExternalUrl?: 0 | 1
includeFuturePublishAt?: 0 | 1
includeFutureUpdates?: '0' | '1'
includesArray?: ReferenceExpansionChapter
limit?: number
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
translatedLanguageArray?: Array<string>
updatedAtSince?: string
            }

export class FeedService {

	/**
	 * Get logged User followed Manga feed (Chapter list)
	 * @returns ChapterList OK
	 * @throws ApiError
	 */
	public static getUserFollowsMangaFeed(data: TDataGetUserFollowsMangaFeed = {}): CancelablePromise<ChapterList> {
		const {
contentRatingArray,
createdAtSince,
excludedGroupsArray,
excludedOriginalLanguageArray,
excludedUploadersArray,
includeEmptyPages,
includeExternalUrl,
includeFuturePublishAt,
includeFutureUpdates = '1',
includesArray,
limit = 100,
offset,
order,
originalLanguageArray,
publishAtSince,
translatedLanguageArray,
updatedAtSince,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/manga/feed',
			query: {
				limit, offset, 'translatedLanguage[]': translatedLanguageArray, 'originalLanguage[]': originalLanguageArray, 'excludedOriginalLanguage[]': excludedOriginalLanguageArray, 'contentRating[]': contentRatingArray, 'excludedGroups[]': excludedGroupsArray, 'excludedUploaders[]': excludedUploadersArray, includeFutureUpdates, createdAtSince, updatedAtSince, publishAtSince, order, 'includes[]': includesArray, includeEmptyPages, includeFuturePublishAt, includeExternalUrl
			},
			errors: {
				400: `Bad Request`,
				404: `User not Found`,
			},
		});
	}

	/**
	 * CustomList Manga feed
	 * @returns ChapterList OK
	 * @throws ApiError
	 */
	public static getListIdFeed(data: TDataGetListIdFeed): CancelablePromise<ChapterList> {
		const {
contentRatingArray,
createdAtSince,
excludedGroupsArray,
excludedOriginalLanguageArray,
excludedUploadersArray,
id,
includeEmptyPages,
includeExternalUrl,
includeFuturePublishAt,
includeFutureUpdates = '1',
includesArray,
limit = 100,
offset,
order,
originalLanguageArray,
publishAtSince,
translatedLanguageArray,
updatedAtSince,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/list/{id}/feed',
			path: {
				id
			},
			query: {
				limit, offset, 'translatedLanguage[]': translatedLanguageArray, 'originalLanguage[]': originalLanguageArray, 'excludedOriginalLanguage[]': excludedOriginalLanguageArray, 'contentRating[]': contentRatingArray, 'excludedGroups[]': excludedGroupsArray, 'excludedUploaders[]': excludedUploadersArray, includeFutureUpdates, createdAtSince, updatedAtSince, publishAtSince, order, 'includes[]': includesArray, includeEmptyPages, includeFuturePublishAt, includeExternalUrl
			},
			errors: {
				400: `Bad Request`,
				401: `Unauthorized`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}