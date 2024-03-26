
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetAtHomeServerChapterId = {
                /**
 * Chapter ID
 */
chapterId: string
/**
 * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
 * 
 * While the conventional port for HTTPS traffic is 443 and servers are encouraged to use it, it is not a hard requirement as it technically isn't
 * anything special.
 * 
 * However, some misbehaving school/office network will at time block traffic to non-standard ports, and setting this flag to `true` will ensure
 * selection of a server that uses these.
 */
forcePort443?: boolean
            }

export class AtHomeService {

	/**
	 * Get MangaDex@Home server URL
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getAtHomeServerChapterId(data: TDataGetAtHomeServerChapterId): CancelablePromise<{
result?: string;
/**
 * The base URL to construct final image URLs from.
 * The URL returned is valid for the requested chapter only, and for a duration of 15 minutes from the time of the response.
 */
baseUrl?: string;
chapter?: {
hash?: string;
data?: Array<string>;
dataSaver?: Array<string>;
};
}> {
		const {
chapterId,
forcePort443 = false,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/at-home/server/{chapterId}',
			path: {
				chapterId
			},
			query: {
				forcePort443
			},
			errors: {
				404: `Not Found`,
			},
		});
	}

}