export const $ChapterList = {
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
		type: 'Chapter',
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