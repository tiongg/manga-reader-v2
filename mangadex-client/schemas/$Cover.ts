export const $Cover = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'CoverAttributes',
},
		relationships: {
	type: 'array',
	contains: {
		type: 'Relationship',
	},
},
	},
} as const;