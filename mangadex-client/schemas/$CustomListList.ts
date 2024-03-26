export const $CustomListList = {
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
		type: 'CustomList',
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