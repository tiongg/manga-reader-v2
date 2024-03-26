import type { ChapterList } from '../models/ChapterList';
import type { MangaCreate } from '../models/MangaCreate';
import type { MangaEdit } from '../models/MangaEdit';
import type { MangaList } from '../models/MangaList';
import type { MangaRelationCreate } from '../models/MangaRelationCreate';
import type { MangaRelationList } from '../models/MangaRelationList';
import type { MangaRelationResponse } from '../models/MangaRelationResponse';
import type { MangaResponse } from '../models/MangaResponse';
import type { ReferenceExpansionChapter } from '../models/ReferenceExpansionChapter';
import type { ReferenceExpansionManga } from '../models/ReferenceExpansionManga';
import type { ReferenceExpansionMangaRelation } from '../models/ReferenceExpansionMangaRelation';
import type { Response } from '../models/Response';
import type { TagResponse } from '../models/TagResponse';
import type { UpdateMangaStatus } from '../models/UpdateMangaStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetSearchManga = {
                artistsArray?: Array<string>
authorOrArtist?: string
authorsArray?: Array<string>
availableTranslatedLanguageArray?: Array<string>
contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
createdAtSince?: string
excludedOriginalLanguageArray?: Array<string>
excludedTagsArray?: Array<string>
excludedTagsMode?: 'AND' | 'OR'
group?: string
hasAvailableChapters?: '0' | '1' | 'true' | 'false'
/**
 * Manga ids (limited to 100 per request)
 */
idsArray?: Array<string>
includedTagsArray?: Array<string>
includedTagsMode?: 'AND' | 'OR'
includesArray?: ReferenceExpansionManga
limit?: number
offset?: number
order?: {
title?: 'asc' | 'desc';
year?: 'asc' | 'desc';
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
latestUploadedChapter?: 'asc' | 'desc';
followedCount?: 'asc' | 'desc';
relevance?: 'asc' | 'desc';
rating?: 'asc' | 'desc';
}
originalLanguageArray?: Array<string>
publicationDemographicArray?: Array<'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none'>
statusArray?: Array<'ongoing' | 'completed' | 'hiatus' | 'cancelled'>
title?: string
updatedAtSince?: string
/**
 * Year of release or none
 */
year?: number | 'none'
            }
export type TDataPostManga = {
                contentType?: string
/**
 * The size of the body is limited to 64KB.
 */
requestBody?: MangaCreate
            }
export type TDataGetMangaAggregate = {
                groupsArray?: Array<string>
/**
 * Manga ID
 */
id: string
translatedLanguageArray?: Array<string>
            }
export type TDataGetMangaId = {
                /**
 * Manga ID
 */
id: string
includesArray?: ReferenceExpansionManga
            }
export type TDataPutMangaId = {
                contentType?: string
/**
 * Manga ID
 */
id: string
/**
 * The size of the body is limited to 64KB.
 */
requestBody?: (MangaEdit & {
artists?: Array<string>;
authors?: Array<string>;
})
            }
export type TDataDeleteMangaId = {
                /**
 * Manga ID
 */
id: string
            }
export type TDataDeleteMangaIdFollow = {
                id: string
            }
export type TDataPostMangaIdFollow = {
                id: string
            }
export type TDataGetMangaIdFeed = {
                contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
createdAtSince?: string
excludedGroupsArray?: Array<string>
excludedOriginalLanguageArray?: Array<string>
excludedUploadersArray?: Array<string>
/**
 * Manga ID
 */
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
export type TDataGetMangaRandom = {
                contentRatingArray?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
excludedTagsArray?: Array<string>
excludedTagsMode?: 'AND' | 'OR'
includedTagsArray?: Array<string>
includedTagsMode?: 'AND' | 'OR'
includesArray?: ReferenceExpansionManga
            }
export type TDataGetMangaStatus = {
                /**
 * Used to filter the list by given status
 */
status?: 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed'
            }
export type TDataGetMangaIdStatus = {
                id: string
            }
export type TDataPostMangaIdStatus = {
                contentType?: string
id: string
/**
 * Using a `null` value in `status` field will remove the Manga reading status. The size of the body is limited to 2KB.
 */
requestBody?: UpdateMangaStatus
            }
export type TDataGetMangaIdDraft = {
                id: string
includesArray?: ReferenceExpansionManga
            }
export type TDataCommitMangaDraft = {
                id: string
/**
 * A Manga Draft that is to be submitted must have at least one cover in the original language, must be in the "draft" state and must be passed the correct version in the request body.
 */
requestBody?: {
version?: number;
}
            }
export type TDataGetMangaDrafts = {
                includesArray?: ReferenceExpansionManga
limit?: number
offset?: number
order?: {
title?: 'asc' | 'desc';
year?: 'asc' | 'desc';
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
}
state?: 'draft' | 'submitted' | 'rejected'
            }
export type TDataGetMangaRelation = {
                includesArray?: ReferenceExpansionMangaRelation
mangaId: string
            }
export type TDataPostMangaRelation = {
                contentType?: string
mangaId: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: MangaRelationCreate
            }
export type TDataDeleteMangaRelationId = {
                id: string
mangaId: string
            }

export class MangaService {

	/**
	 * Manga list
	 * Search a list of Manga.
	 * @returns MangaList Manga list
	 * @throws ApiError
	 */
	public static getSearchManga(data: TDataGetSearchManga = {}): CancelablePromise<MangaList> {
		const {
artistsArray,
authorOrArtist,
authorsArray,
availableTranslatedLanguageArray,
contentRatingArray,
createdAtSince,
excludedOriginalLanguageArray,
excludedTagsArray,
excludedTagsMode = 'OR',
group,
hasAvailableChapters,
idsArray,
includedTagsArray,
includedTagsMode = 'AND',
includesArray,
limit = 10,
offset,
order = {
    "latestUploadedChapter": "desc"
},
originalLanguageArray,
publicationDemographicArray,
statusArray,
title,
updatedAtSince,
year,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga',
			query: {
				limit, offset, title, authorOrArtist, 'authors[]': authorsArray, 'artists[]': artistsArray, year, 'includedTags[]': includedTagsArray, includedTagsMode, 'excludedTags[]': excludedTagsArray, excludedTagsMode, 'status[]': statusArray, 'originalLanguage[]': originalLanguageArray, 'excludedOriginalLanguage[]': excludedOriginalLanguageArray, 'availableTranslatedLanguage[]': availableTranslatedLanguageArray, 'publicationDemographic[]': publicationDemographicArray, 'ids[]': idsArray, 'contentRating[]': contentRatingArray, createdAtSince, updatedAtSince, order, 'includes[]': includesArray, hasAvailableChapters, group
			},
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * Create Manga
	 * Create a new Manga.
	 * @returns MangaResponse Manga Created
	 * @throws ApiError
	 */
	public static postManga(data: TDataPostManga): CancelablePromise<MangaResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga',
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
	 * Get Manga volumes & chapters
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getMangaAggregate(data: TDataGetMangaAggregate): CancelablePromise<{
result?: string;
volumes?: Record<string, {
volume?: string;
count?: number;
chapters?: Record<string, {
chapter?: string;
id?: string;
others?: Array<string>;
count?: number;
}>;
}>;
}> {
		const {
groupsArray,
id,
translatedLanguageArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/{id}/aggregate',
			path: {
				id
			},
			query: {
				'translatedLanguage[]': translatedLanguageArray, 'groups[]': groupsArray
			},
		});
	}

	/**
	 * Get Manga
	 * Get Manga.
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static getMangaId(data: TDataGetMangaId): CancelablePromise<MangaResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `Manga no content`,
			},
		});
	}

	/**
	 * Update Manga
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static putMangaId(data: TDataPutMangaId): CancelablePromise<MangaResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/manga/{id}',
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
	 * Delete Manga
	 * @returns Response Manga has been deleted.
	 * @throws ApiError
	 */
	public static deleteMangaId(data: TDataDeleteMangaId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/manga/{id}',
			path: {
				id
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Unfollow Manga
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteMangaIdFollow(data: TDataDeleteMangaIdFollow): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/manga/{id}/follow',
			path: {
				id
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

	/**
	 * Follow Manga
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postMangaIdFollow(data: TDataPostMangaIdFollow): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/{id}/follow',
			path: {
				id
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

	/**
	 * Manga feed
	 * @returns ChapterList OK
	 * @throws ApiError
	 */
	public static getMangaIdFeed(data: TDataGetMangaIdFeed): CancelablePromise<ChapterList> {
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
			url: '/manga/{id}/feed',
			path: {
				id
			},
			query: {
				limit, offset, 'translatedLanguage[]': translatedLanguageArray, 'originalLanguage[]': originalLanguageArray, 'excludedOriginalLanguage[]': excludedOriginalLanguageArray, 'contentRating[]': contentRatingArray, 'excludedGroups[]': excludedGroupsArray, 'excludedUploaders[]': excludedUploadersArray, includeFutureUpdates, createdAtSince, updatedAtSince, publishAtSince, order, 'includes[]': includesArray, includeEmptyPages, includeFuturePublishAt, includeExternalUrl
			},
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * Get a random Manga
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static getMangaRandom(data: TDataGetMangaRandom = {}): CancelablePromise<MangaResponse> {
		const {
contentRatingArray,
excludedTagsArray,
excludedTagsMode = 'OR',
includedTagsArray,
includedTagsMode = 'AND',
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/random',
			query: {
				'includes[]': includesArray, 'contentRating[]': contentRatingArray, 'includedTags[]': includedTagsArray, includedTagsMode, 'excludedTags[]': excludedTagsArray, excludedTagsMode
			},
		});
	}

	/**
	 * Tag list
	 * @returns TagResponse OK
	 * @throws ApiError
	 */
	public static getMangaTag(): CancelablePromise<TagResponse> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/tag',
		});
	}

	/**
	 * Get all Manga reading status for logged User
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getMangaStatus(data: TDataGetMangaStatus = {}): CancelablePromise<{
result?: string;
statuses?: Record<string, 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed'>;
}> {
		const {
status,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/status',
			query: {
				status
			},
		});
	}

	/**
	 * Get a Manga reading status
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getMangaIdStatus(data: TDataGetMangaIdStatus): CancelablePromise<{
result?: string;
status?: 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed';
}> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/{id}/status',
			path: {
				id
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Update Manga reading status
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postMangaIdStatus(data: TDataPostMangaIdStatus): CancelablePromise<Response> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/{id}/status',
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
				404: `Not Found`,
			},
		});
	}

	/**
	 * Get a specific Manga Draft
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static getMangaIdDraft(data: TDataGetMangaIdDraft): CancelablePromise<MangaResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/draft/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Submit a Manga Draft
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static commitMangaDraft(data: TDataCommitMangaDraft): CancelablePromise<MangaResponse> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/draft/{id}/commit',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `BadRequest`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Get a list of Manga Drafts
	 * @returns MangaResponse OK
	 * @throws ApiError
	 */
	public static getMangaDrafts(data: TDataGetMangaDrafts = {}): CancelablePromise<MangaResponse> {
		const {
includesArray,
limit = 10,
offset,
order = {
    "createdAt": "desc"
},
state,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/draft',
			query: {
				limit, offset, state, order, 'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Manga relation list
	 * @returns MangaRelationList Manga relation list
	 * @throws ApiError
	 */
	public static getMangaRelation(data: TDataGetMangaRelation): CancelablePromise<MangaRelationList> {
		const {
includesArray,
mangaId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/manga/{mangaId}/relation',
			path: {
				mangaId
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * Create Manga relation
	 * Create a new Manga relation.
	 * @returns MangaRelationResponse Manga relation created
	 * @throws ApiError
	 */
	public static postMangaRelation(data: TDataPostMangaRelation): CancelablePromise<MangaRelationResponse> {
		const {
contentType = 'application/json',
mangaId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/{mangaId}/relation',
			path: {
				mangaId
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
	 * Delete Manga relation
	 * @returns Response Manga relation has been deleted.
	 * @throws ApiError
	 */
	public static deleteMangaRelationId(data: TDataDeleteMangaRelationId): CancelablePromise<Response> {
		const {
id,
mangaId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/manga/{mangaId}/relation/{id}',
			path: {
				mangaId, id
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}