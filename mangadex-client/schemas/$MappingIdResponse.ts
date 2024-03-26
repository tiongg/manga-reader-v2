export const $MappingIdResponse = {
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
		type: 'MappingId',
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