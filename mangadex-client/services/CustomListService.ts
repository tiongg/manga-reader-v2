import type { CustomListCreate } from '../models/CustomListCreate';
import type { CustomListEdit } from '../models/CustomListEdit';
import type { CustomListList } from '../models/CustomListList';
import type { CustomListResponse } from '../models/CustomListResponse';
import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataPostList = {
                contentType?: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: CustomListCreate
            }
export type TDataGetListId = {
                /**
 * CustomList ID
 */
id: string
            }
export type TDataPutListId = {
                contentType?: string
/**
 * CustomList ID
 */
id: string
requestBody?: CustomListEdit
            }
export type TDataDeleteListId = {
                /**
 * CustomList ID
 */
id: string
            }
export type TDataFollowListId = {
                contentType?: string
/**
 * CustomList ID
 */
id: string
requestBody?: Record<string, unknown>
            }
export type TDataUnfollowListId = {
                /**
 * CustomList ID
 */
id: string
requestBody?: Record<string, unknown>
            }
export type TDataPostMangaIdListListId = {
                /**
 * Manga ID
 */
id: string
/**
 * CustomList ID
 */
listId: string
            }
export type TDataDeleteMangaIdListListId = {
                /**
 * Manga ID
 */
id: string
/**
 * CustomList ID
 */
listId: string
            }
export type TDataGetUserList = {
                limit?: number
offset?: number
            }
export type TDataGetUserIdList = {
                /**
 * User ID
 */
id: string
limit?: number
offset?: number
            }

export class CustomListService {

	/**
	 * Create CustomList
	 * @returns CustomListResponse OK
	 * @throws ApiError
	 */
	public static postList(data: TDataPostList): CancelablePromise<CustomListResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/list',
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
	 * Get CustomList
	 * @returns CustomListResponse OK
	 * @throws ApiError
	 */
	public static getListId(data: TDataGetListId): CancelablePromise<CustomListResponse> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/list/{id}',
			path: {
				id
			},
			errors: {
				404: `CustomList not found`,
			},
		});
	}

	/**
	 * Update CustomList
	 * The size of the body is limited to 8KB.
	 * @returns CustomListResponse OK
	 * @throws ApiError
	 */
	public static putListId(data: TDataPutListId): CancelablePromise<CustomListResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/list/{id}',
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
	 * Delete CustomList
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteListId(data: TDataDeleteListId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/list/{id}',
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
	 * Follow CustomList
	 * The request body is empty
	 * @returns any OK
	 * @throws ApiError
	 */
	public static followListId(data: TDataFollowListId): CancelablePromise<{
result?: 'ok';
}> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/list/{id}/follow',
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
	 * Unfollow CustomList
	 * The request body is empty
	 * @returns any OK
	 * @throws ApiError
	 */
	public static unfollowListId(data: TDataUnfollowListId): CancelablePromise<{
result?: 'ok';
}> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/list/{id}/follow',
			path: {
				id
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
	 * Add Manga in CustomList
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static postMangaIdListListId(data: TDataPostMangaIdListListId): CancelablePromise<Response> {
		const {
id,
listId,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/manga/{id}/list/{listId}',
			path: {
				id, listId
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Remove Manga in CustomList
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteMangaIdListListId(data: TDataDeleteMangaIdListListId): CancelablePromise<Response> {
		const {
id,
listId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/manga/{id}/list/{listId}',
			path: {
				id, listId
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Get logged User CustomList list
	 * This will list public and private CustomList
	 * @returns CustomListList OK
	 * @throws ApiError
	 */
	public static getUserList(data: TDataGetUserList = {}): CancelablePromise<CustomListList> {
		const {
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/list',
			query: {
				limit, offset
			},
		});
	}

	/**
	 * Get User's CustomList list
	 * This will list only public CustomList
	 * @returns CustomListList OK
	 * @throws ApiError
	 */
	public static getUserIdList(data: TDataGetUserIdList): CancelablePromise<CustomListList> {
		const {
id,
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/{id}/list',
			path: {
				id
			},
			query: {
				limit, offset
			},
		});
	}

}