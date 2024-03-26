import type { CustomListList } from '../models/CustomListList';
import type { MangaList } from '../models/MangaList';
import type { ReferenceExpansionManga } from '../models/ReferenceExpansionManga';
import type { ReferenceExpansionScanlationGroup } from '../models/ReferenceExpansionScanlationGroup';
import type { Response } from '../models/Response';
import type { ScanlationGroupList } from '../models/ScanlationGroupList';
import type { UserList } from '../models/UserList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetUserFollowsGroup = {
                includesArray?: ReferenceExpansionScanlationGroup
limit?: number
offset?: number
            }
export type TDataGetUserFollowsGroupId = {
                /**
 * Scanlation Group id
 */
id: string
            }
export type TDataGetUserFollowsUser = {
                limit?: number
offset?: number
            }
export type TDataGetUserFollowsUserId = {
                /**
 * User id
 */
id: string
            }
export type TDataGetUserFollowsManga = {
                includesArray?: ReferenceExpansionManga
limit?: number
offset?: number
            }
export type TDataGetUserFollowsMangaId = {
                /**
 * Manga id
 */
id: string
            }
export type TDataGetUserFollowsList = {
                limit?: number
offset?: number
            }
export type TDataGetUserFollowsListId = {
                /**
 * CustomList id
 */
id: string
            }

export class FollowsService {

	/**
	 * Get logged User followed Groups
	 * @returns ScanlationGroupList OK
	 * @throws ApiError
	 */
	public static getUserFollowsGroup(data: TDataGetUserFollowsGroup = {}): CancelablePromise<ScanlationGroupList> {
		const {
includesArray,
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/group',
			query: {
				limit, offset, 'includes[]': includesArray
			},
		});
	}

	/**
	 * Check if logged User follows a Group
	 * @returns Response The User follow that Group
	 * @throws ApiError
	 */
	public static getUserFollowsGroupId(data: TDataGetUserFollowsGroupId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/group/{id}',
			path: {
				id
			},
			errors: {
				404: `The User doesn't follow that Group`,
			},
		});
	}

	/**
	 * Get logged User followed User list
	 * @returns UserList OK
	 * @throws ApiError
	 */
	public static getUserFollowsUser(data: TDataGetUserFollowsUser = {}): CancelablePromise<UserList> {
		const {
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/user',
			query: {
				limit, offset
			},
		});
	}

	/**
	 * Check if logged User follows a User
	 * @returns Response The User follow that User
	 * @throws ApiError
	 */
	public static getUserFollowsUserId(data: TDataGetUserFollowsUserId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/user/{id}',
			path: {
				id
			},
			errors: {
				404: `The User doesn't follow that User`,
			},
		});
	}

	/**
	 * Get logged User followed Manga list
	 * @returns MangaList OK
	 * @throws ApiError
	 */
	public static getUserFollowsManga(data: TDataGetUserFollowsManga = {}): CancelablePromise<MangaList> {
		const {
includesArray,
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/manga',
			query: {
				limit, offset, 'includes[]': includesArray
			},
		});
	}

	/**
	 * Check if logged User follows a Manga
	 * @returns Response The User follow that Manga
	 * @throws ApiError
	 */
	public static getUserFollowsMangaId(data: TDataGetUserFollowsMangaId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/manga/{id}',
			path: {
				id
			},
			errors: {
				404: `The User doesn't follow that Manga`,
			},
		});
	}

	/**
	 * Get logged User followed CustomList list
	 * @returns CustomListList OK
	 * @throws ApiError
	 */
	public static getUserFollowsList(data: TDataGetUserFollowsList = {}): CancelablePromise<CustomListList> {
		const {
limit = 10,
offset,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/list',
			query: {
				limit, offset
			},
		});
	}

	/**
	 * Check if logged User follows a CustomList
	 * @returns Response The User follow that CustomList
	 * @throws ApiError
	 */
	public static getUserFollowsListId(data: TDataGetUserFollowsListId): CancelablePromise<Response> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/user/follows/list/{id}',
			path: {
				id
			},
			errors: {
				404: `The User doesn't follow that CustomList`,
			},
		});
	}

}