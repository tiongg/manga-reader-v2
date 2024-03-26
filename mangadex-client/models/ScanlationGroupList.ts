import type { ScanlationGroup } from './ScanlationGroup';

export type ScanlationGroupList = {
	result?: string;
	response?: string;
	data?: Array<ScanlationGroup>;
	limit?: number;
	offset?: number;
	total?: number;
};

