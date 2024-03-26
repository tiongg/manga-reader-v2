export const $ReportListResponse = {
	properties: {
		result: {
	type: 'Enum',
},
		response: {
	type: 'string',
},
		data: {
	type: 'array',
	contains: {
		type: 'Report',
	},
},
		limit: {
	type: 'number',
},
		offset: {
	type: 'number',
},
		total: {
	type: 'number',
},
	},
} as const;