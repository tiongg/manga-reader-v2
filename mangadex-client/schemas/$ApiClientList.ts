export const $ApiClientList = {
	properties: {
		result: {
	type: 'string',
},
		response: {
	type: 'string',
},
		data: {
	type: 'array',
	contains: {
		type: 'ApiClient',
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