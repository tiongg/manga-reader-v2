import type { ApiClientCreate } from '../models/ApiClientCreate';
import type { ApiClientEdit } from '../models/ApiClientEdit';
import type { ApiClientList } from '../models/ApiClientList';
import type { ApiClientResponse } from '../models/ApiClientResponse';
import type { ReferenceExpansionApiClient } from '../models/ReferenceExpansionApiClient';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetListApiclients = {
                includesArray?: ReferenceExpansionApiClient
limit?: number
name?: string
offset?: number
order?: {
name?: 'asc' | 'desc';
createdAt?: 'asc' | 'desc';
updatedAt?: 'asc' | 'desc';
}
state?: 'requested' | 'approved' | 'rejected' | 'autoapproved'
            }
export type TDataPostCreateApiclient = {
                contentType?: string
requestBody?: ApiClientCreate
            }
export type TDataGetApiclient = {
                /**
 * ApiClient ID
 */
id: string
includesArray?: ReferenceExpansionApiClient
            }
export type TDataPostEditApiclient = {
                contentType?: string
/**
 * ApiClient ID
 */
id: string
requestBody?: ApiClientEdit
            }
export type TDataDeleteApiclient = {
                /**
 * ApiClient ID
 */
id: string
version?: string
            }
export type TDataGetApiclientSecret = {
                /**
 * ApiClient ID
 */
id: string
            }
export type TDataPostRegenerateApiclientSecret = {
                contentType?: string
/**
 * ApiClient ID
 */
id: string
requestBody?: Record<string, unknown>
            }

export class ApiClientService {

	/**
	 * List own Api Clients
	 * @returns ApiClientList OK
	 * @throws ApiError
	 */
	public static getListApiclients(data: TDataGetListApiclients = {}): CancelablePromise<ApiClientList> {
		const {
includesArray,
limit = 10,
name,
offset,
order = {
    "createdAt": "desc"
},
state,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/client',
			query: {
				limit, offset, state, name, 'includes[]': includesArray, order
			},
		});
	}

	/**
	 * Create ApiClient
	 * @returns ApiClientResponse OK
	 * @throws ApiError
	 */
	public static postCreateApiclient(data: TDataPostCreateApiclient): CancelablePromise<ApiClientResponse> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/client',
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
	 * Get Api Client by ID
	 * @returns ApiClientResponse OK
	 * @throws ApiError
	 */
	public static getApiclient(data: TDataGetApiclient): CancelablePromise<ApiClientResponse> {
		const {
id,
includesArray,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/client/{id}',
			path: {
				id
			},
			query: {
				'includes[]': includesArray
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

	/**
	 * Edit ApiClient
	 * @returns ApiClientResponse OK
	 * @throws ApiError
	 */
	public static postEditApiclient(data: TDataPostEditApiclient): CancelablePromise<ApiClientResponse> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/client/{id}',
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
	 * Delete Api Client
	 * @returns any OK
	 * @throws ApiError
	 */
	public static deleteApiclient(data: TDataDeleteApiclient): CancelablePromise<{
result?: string;
}> {
		const {
id,
version,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/client/{id}',
			path: {
				id
			},
			query: {
				version
			},
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Get Secret for Client by ID
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getApiclientSecret(data: TDataGetApiclientSecret): CancelablePromise<{
result?: 'ok';
data?: string;
}> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/client/{id}/secret',
			path: {
				id
			},
			errors: {
				403: `Client not found, not active or user is not the owner`,
			},
		});
	}

	/**
	 * Regenerate Client Secret
	 * @returns any OK
	 * @throws ApiError
	 */
	public static postRegenerateApiclientSecret(data: TDataPostRegenerateApiclientSecret): CancelablePromise<{
result?: 'ok';
data?: string;
}> {
		const {
contentType = 'application/json',
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/client/{id}/secret',
			path: {
				id
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Client not found, not active or user is not the owner`,
			},
		});
	}

}