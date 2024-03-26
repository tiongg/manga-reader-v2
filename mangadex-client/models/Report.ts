import type { Relationship } from './Relationship';
import type { ReportAttributes } from './ReportAttributes';

export type Report = {
	id?: string;
	type?: 'report';
	attributes?: ReportAttributes;
	relationships?: Array<Relationship>;
};


