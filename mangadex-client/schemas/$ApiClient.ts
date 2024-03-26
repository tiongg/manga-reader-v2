export const $ApiClient = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'ApiClientAttributes',
},
		relationships: {
	type: 'array',
	contains: {
		type: 'Relationship',
	},
},
	},
} as const;