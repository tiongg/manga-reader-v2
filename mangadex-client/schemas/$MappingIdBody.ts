export const $MappingIdBody = {
	properties: {
		type: {
	type: 'Enum',
},
		ids: {
	type: 'array',
	contains: {
	type: 'number',
},
},
	},
} as const;