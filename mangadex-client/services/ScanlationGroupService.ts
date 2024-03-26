import type { CreateScanlationGroup } from '../models/CreateScanlationGroup';
import type { ReferenceExpansionScanlationGroup } from '../models/ReferenceExpansionScanlationGroup';
import type { Response } from '../models/Response';
import type { ScanlationGroupEdit } from '../models/ScanlationGroupEdit';
import type { ScanlationGroupList } from '../models/ScanlationGroupList';
import type { ScanlationGroupResponse } from '../models/ScanlationGroupResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetSearchGroup = {
                focusedLanguage?: string
/**
 * ScanlationGroup ids (limited to 100 per request)
 */
idsArray?: Array<string>
includesArray?: ReferenceExpansionScanlationGroup
limit?: number
name?: string
offset?: number
order?: {
name?: 'asc' | 'desc';
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
followedCount?: 'asc' | 'desc';
relevance?: 'asc' | 'desc';
}
            }
export type TDataPostGroup = {
                contentType?: string
/**
 * The size of the body is limited to 16KB.
 */
requestBody?: CreateScanlationGroup
            }
export type TDataGetGroupId = {
                /**
 * Scanlation Group ID
 */
id: string
includesArray?: ReferenceExpansionScanlationGroup
            }
export type TDataPutGroupId = {
                contentType?: string
/**
 * Scanlation Group ID
 */
id: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: ScanlationGroupEdit
            }
export type TDataDeleteGroupId = {
                /**
 * Scanlation Group ID
 */
id: string
            }
export type TDataPostGroupIdFollow = {
                id: string
            }
export type TDataDeleteGroupIdFollow = {
                id: string
            }

export class ScanlationGroupService {

	/**
	 * Scanlation Group list
	 * @returns ScanlationGroupList OK
	 * @throws ApiError
	 */
	public static getSearchGroup(data: TDataGetSearchGroup = {}): CancelablePromise<ScanlationGroupList> {
		const {
focusedLanguage,
idsArray,
includesArray,
limit = 10,
name,
offset,
order = {
    "latestUploadedChapter": "desc"
},
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/group',
			query: {
				limit, offset, 'ids[]': idsArray, name, focusedLanguage, 'includes[]': includesArray, order
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Create Scanlation Group
	 * @returns ScanlationGroupResponse OK
	 * @throws ApiError
	 */
	public static postGroup(data: TDataPostGroup): CancelablePromise<ScanlationGroupResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/group',
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
	 * Get Scanlation Group
	 * @returns ScanlationGroupResponse OK
	 * @throws ApiError
	 */
	public static getGroupId(data: TDataGetGroupId): CancelablePromise<ScanlationGroupResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/group/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				403: `Forbidden`,
				404: `ScanlationGroup not found`,
			},
		});
	}

	/**
	 * Update Scanlation Group
	 * @returns ScanlationGroupResponse OK
	 * @throws ApiError
	 */
	public static putGroupId(data: TDataPutGroupId): CancelablePromise<ScanlationGroupResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/group/{id}',
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
	 * Delete Scanlation Group
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteGroupId(data: TDataDeleteGroupId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/group/{id}',
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
	 * Follow Scanlation Group
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postGroupIdFollow(data: TDataPostGroupIdFollow): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/group/{id}/follow',
			path: {
				id
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

	/**
	 * Unfollow Scanlation Group
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteGroupIdFollow(data: TDataDeleteGroupIdFollow): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/group/{id}/follow',
			path: {
				id
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

}