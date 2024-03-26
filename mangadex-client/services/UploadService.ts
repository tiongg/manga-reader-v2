import type { BeginEditSession } from '../models/BeginEditSession';
import type { BeginUploadSession } from '../models/BeginUploadSession';
import type { Chapter } from '../models/Chapter';
import type { CommitUploadSession } from '../models/CommitUploadSession';
import type { Error } from '../models/Error';
import type { Response } from '../models/Response';
import type { UploadSession } from '../models/UploadSession';
import type { UploadSessionFile } from '../models/UploadSessionFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataBeginUploadSession = {
                contentType?: string
/**
 * The size of the body is limited to 4KB.
 */
requestBody?: BeginUploadSession
            }
export type TDataBeginEditSession = {
                chapterId: string
contentType?: string
/**
 * The size of the body is limited to 1KB.
 */
requestBody?: BeginEditSession
            }
export type TDataPutUploadSessionFile = {
                contentType?: string
formData?: {
file?: Blob;
}
uploadSessionId: string
            }
export type TDataAbandonUploadSession = {
                uploadSessionId: string
            }
export type TDataCommitUploadSession = {
                contentType?: string
/**
 * The size of the body is limited to 4KB.
 */
requestBody?: CommitUploadSession
uploadSessionId: string
            }
export type TDataDeleteUploadedSessionFile = {
                uploadSessionFileId: string
uploadSessionId: string
            }
export type TDataDeleteUploadedSessionFiles = {
                contentType?: string
/**
 * The size of the body is limited to 20KB.
 */
requestBody?: Array<string>
uploadSessionId: string
            }

export class UploadService {

	/**
	 * Get the current User upload session
	 * @returns UploadSession OK
	 * @throws ApiError
	 */
	public static getUploadSession(): CancelablePromise<UploadSession> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/upload',
			errors: {
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Start an upload session
	 * @returns UploadSession OK
	 * @throws ApiError
	 */
	public static beginUploadSession(data: TDataBeginUploadSession): CancelablePromise<UploadSession> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/upload/begin',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Start an edit chapter session
	 * @returns UploadSession OK
	 * @throws ApiError
	 */
	public static beginEditSession(data: TDataBeginEditSession): CancelablePromise<UploadSession> {
		const {
chapterId,
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/upload/begin/{chapterId}',
			path: {
				chapterId
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad Request if Chapter's Manga is unpublished`,
				401: `Unauthorized if user does not have upload permissions or has no rights to edit the chapter (needs to be uploader or group member)`,
			},
		});
	}

	/**
	 * Upload images to the upload session
	 * @returns any OK
	 * @throws ApiError
	 */
	public static putUploadSessionFile(data: TDataPutUploadSessionFile): CancelablePromise<{
result?: 'ok' | 'error';
errors?: Array<Error>;
data?: Array<UploadSessionFile>;
}> {
		const {
contentType = 'application/json',
formData,
uploadSessionId,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/upload/{uploadSessionId}',
			path: {
				uploadSessionId
			},
			headers: {
				'Content-Type': contentType
			},
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				400: `Bad Request`,
			},
		});
	}

	/**
	 * Abandon upload session
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static abandonUploadSession(data: TDataAbandonUploadSession): CancelablePromise<Response> {
		const {
uploadSessionId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/upload/{uploadSessionId}',
			path: {
				uploadSessionId
			},
		});
	}

	/**
	 * Commit the upload session and specify chapter data
	 * @returns Chapter OK
	 * @throws ApiError
	 */
	public static commitUploadSession(data: TDataCommitUploadSession): CancelablePromise<Chapter> {
		const {
contentType = 'application/json',
requestBody,
uploadSessionId,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/upload/{uploadSessionId}/commit',
			path: {
				uploadSessionId
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Delete an uploaded image from the Upload Session
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteUploadedSessionFile(data: TDataDeleteUploadedSessionFile): CancelablePromise<Response> {
		const {
uploadSessionFileId,
uploadSessionId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/upload/{uploadSessionId}/{uploadSessionFileId}',
			path: {
				uploadSessionId, uploadSessionFileId
			},
		});
	}

	/**
	 * Delete a set of uploaded images from the Upload Session
	 * @returns Response OK
	 * @throws ApiError
	 */
	public static deleteUploadedSessionFiles(data: TDataDeleteUploadedSessionFiles): CancelablePromise<Response> {
		const {
contentType = 'application/json',
requestBody,
uploadSessionId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/upload/{uploadSessionId}/batch',
			path: {
				uploadSessionId
			},
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

}