import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetRating = {
                manga: Array<string>
            }
export type TDataPostRatingMangaId = {
                mangaId: string
requestBody?: {
rating?: number;
}
            }
export type TDataDeleteRatingMangaId = {
                mangaId: string
            }

export class RatingService {

	/**
	 * Get your ratings
	 * @returns any Self-rating list
	 * @throws ApiError
	 */
	public static getRating(data: TDataGetRating): CancelablePromise<{
result?: string;
ratings?: Record<string, {
rating?: number;
createdAt?: string;
}>;
}> {
		const {
manga,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/rating',
			query: {
				manga
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Create or update Manga rating
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postRatingMangaId(data: TDataPostRatingMangaId): CancelablePromise<Response> {
		const {
mangaId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/rating/{mangaId}',
			path: {
				mangaId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Delete Manga rating
	 * @returns Response Manga rating was deleted
	 * @throws ApiError
	 */
	public static deleteRatingMangaId(data: TDataDeleteRatingMangaId): CancelablePromise<Response> {
		const {
mangaId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/rating/{mangaId}',
			path: {
				mangaId
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}