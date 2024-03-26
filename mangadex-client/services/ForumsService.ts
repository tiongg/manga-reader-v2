import type { ForumsThreadResponse } from '../models/ForumsThreadResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataForumsThreadCreate = {
                requestBody?: {
/**
 * The type of the resource
 */
type?: 'manga' | 'group' | 'chapter';
/**
 * The id of the resource
 */
id?: string;
}
            }

export class ForumsService {

	/**
	 * Create forums thread
	 * Creates a thread in the forums for the given resource, which backs the comments functionality.
 * A thread is only created if it doesn't exist yet; otherwise the preexisting thread is returned.
 * 
	 * @returns ForumsThreadResponse OK
	 * @throws ApiError
	 */
	public static forumsThreadCreate(data: TDataForumsThreadCreate = {}): CancelablePromise<ForumsThreadResponse> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/forums/thread',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Forbidden`,
				404: `If the resource for which the thread creation was requested does not exist`,
			},
		});
	}

}