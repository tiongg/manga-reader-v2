import type { StatisticsDetailsComments } from '../models/StatisticsDetailsComments';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetStatisticsChapterUuid = {
                uuid: string
            }
export type TDataGetStatisticsChapters = {
                chapterArray: Array<string>
            }
export type TDataGetStatisticsGroupUuid = {
                uuid: string
            }
export type TDataGetStatisticsGroups = {
                groupArray: Array<string>
            }
export type TDataGetStatisticsMangaUuid = {
                uuid: string
            }
export type TDataGetStatisticsManga = {
                mangaArray: Array<string>
            }

export class StatisticsService {

	/**
	 * Get statistics about given chapter
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsChapterUuid(data: TDataGetStatisticsChapterUuid): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
}>;
}> {
		const {
uuid,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/chapter/{uuid}',
			path: {
				uuid
			},
		});
	}

	/**
	 * Get statistics about given chapters
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsChapters(data: TDataGetStatisticsChapters): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
}>;
}> {
		const {
chapterArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/chapter',
			query: {
				'chapter[]': chapterArray
			},
		});
	}

	/**
	 * Get statistics about given scanlation group
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsGroupUuid(data: TDataGetStatisticsGroupUuid): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
}>;
}> {
		const {
uuid,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/group/{uuid}',
			path: {
				uuid
			},
		});
	}

	/**
	 * Get statistics about given groups
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsGroups(data: TDataGetStatisticsGroups): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
}>;
}> {
		const {
groupArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/group',
			query: {
				'group[]': groupArray
			},
		});
	}

	/**
	 * Get statistics about given Manga
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsMangaUuid(data: TDataGetStatisticsMangaUuid): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
rating?: {
/**
 * Will be nullable if no ratings has been given
 */
average?: number | null;
/**
 * Average weighted on all the Manga population
 */
bayesian?: number;
distribution?: {
'1'?: number;
'2'?: number;
'3'?: number;
'4'?: number;
'5'?: number;
'6'?: number;
'7'?: number;
'8'?: number;
'9'?: number;
'10'?: number;
};
};
follows?: number;
}>;
}> {
		const {
uuid,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/manga/{uuid}',
			path: {
				uuid
			},
		});
	}

	/**
	 * Find statistics about given Manga
	 * @returns any Statistics
	 * @throws ApiError
	 */
	public static getStatisticsManga(data: TDataGetStatisticsManga): CancelablePromise<{
result?: string;
statistics?: Record<string, {
comments?: StatisticsDetailsComments;
rating?: {
/**
 * Will be nullable if no ratings has been done
 */
average?: number | null;
/**
 * Average weighted on all the Manga population
 */
bayesian?: number;
};
follows?: number;
}>;
}> {
		const {
mangaArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/statistics/manga',
			query: {
				'manga[]': mangaArray
			},
		});
	}

}