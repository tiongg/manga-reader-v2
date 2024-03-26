import type { Report } from './Report';

export type ReportListResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Array<Report>;
	limit?: number;
	offset?: number;
	total?: number;
};


