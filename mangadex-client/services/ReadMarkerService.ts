import type { ChapterReadMarkerBatch } from '../models/ChapterReadMarkerBatch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetMangaChapterReadmarkers = {
                id: string
            }
export type TDataPostMangaChapterReadmarkers = {
                id: string
/**
 * The size of the body is limited to 10KB.
 */
requestBody?: ChapterReadMarkerBatch
/**
 * Adding this will cause the chapter to be stored in the user's reading history
 */
updateHistory?: boolean
            }
export type TDataGetMangaChapterReadmarkers2 = {
                /**
 * Group results by manga ids
 */
grouped?: boolean
/**
 * Manga ids
 */
idsArray: Array<string>
            }

export class ReadMarkerService {

	/**
	 * Manga read markers
	 * A list of chapter ids that are marked as read for the specified manga
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getMangaChapterReadmarkers(data: TDataGetMangaChapterReadmarkers): CancelablePromise<{
result?: 'ok';
data?: Array<string>;
}> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/{id}/read',
			path: {
				id
			},
		});
	}

	/**
	 * Manga read markers batch
	 * Send a lot of chapter ids for one manga to mark as read and/or unread
	 * @returns any OK
	 * @throws ApiError
	 */
	public static postMangaChapterReadmarkers(data: TDataPostMangaChapterReadmarkers): CancelablePromise<{
result?: 'ok';
}> {
		const {
id,
requestBody,
updateHistory,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/{id}/read',
			path: {
				id
			},
			query: {
				updateHistory
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Manga read markers
	 * A list of chapter ids that are marked as read for the given manga ids
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getMangaChapterReadmarkers2(data: TDataGetMangaChapterReadmarkers2): CancelablePromise<{
result?: 'ok';
data?: Array<string> | Record<string, Array<string>>;
}> {
		const {
grouped,
idsArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/read',
			query: {
				'ids[]': idsArray, grouped
			},
		});
	}

	/**
	 * Get users reading history
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getReadingHistory(): CancelablePromise<{
result?: string;
ratings?: Array<{
chapterId?: string;
readDate?: string;
}>;
}> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/user/history',
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

}