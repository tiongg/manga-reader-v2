import type { LocalizedString } from '../models/LocalizedString';
import type { ReferenceExpansionReport } from '../models/ReferenceExpansionReport';
import type { ReportListResponse } from '../models/ReportListResponse';
import type { Response } from '../models/Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type TDataGetReportReasonsByCategory = {
                category: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author'
            }
export type TDataGetReports = {
                category?: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author'
includesArray?: ReferenceExpansionReport
limit?: number
objectId?: string
offset?: number
order?: {
createdAt?: 'asc' | 'desc';
}
reasonId?: string
status?: 'waiting' | 'accepted' | 'refused' | 'autoresolved'
            }
export type TDataPostReport = {
                contentType?: string
/**
 * The size of the body is limited to 8KB.
 */
requestBody?: {
category?: 'manga' | 'chapter' | 'user' | 'scanlation_group' | 'author';
reason?: string;
objectId?: string;
details?: string;
}
            }

export class ReportService {

	/**
	 * Get a list of report reasons
	 * @returns any OK
	 * @throws ApiError
	 */
	public static getReportReasonsByCategory(data: TDataGetReportReasonsByCategory): CancelablePromise<{
result?: string;
response?: string;
data?: Array<{
id?: string;
type?: string;
attributes?: {
reason?: LocalizedString;
detailsRequired?: boolean;
category?: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author';
version?: number;
};
}>;
limit?: number;
offset?: number;
total?: number;
}> {
		const {
category,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/report/reasons/{category}',
			path: {
				category
			},
			errors: {
				400: `Bad request`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

	/**
	 * Get a list of reports by the user
	 * @returns ReportListResponse OK
	 * @throws ApiError
	 */
	public static getReports(data: TDataGetReports = {}): CancelablePromise<ReportListResponse> {
		const {
category,
includesArray,
limit = 10,
objectId,
offset,
order = {
    "createdAt": "desc"
},
reasonId,
status,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/report',
			query: {
				limit, offset, category, reasonId, objectId, status, order, 'includes[]': includesArray
			},
			errors: {
				400: `Bad Request`,
				403: `Forbidden`,
			},
		});
	}

	/**
	 * Create a new Report
	 * @returns Response Created
	 * @throws ApiError
	 */
	public static postReport(data: TDataPostReport): CancelablePromise<Response> {
		const {
contentType = 'application/json',
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/report',
			headers: {
				'Content-Type': contentType
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Bad request`,
				403: `Forbidden`,
				404: `Not Found`,
			},
		});
	}

}