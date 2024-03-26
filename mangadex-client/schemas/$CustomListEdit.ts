export const $CustomListEdit = {
	properties: {
		name: {
	type: 'string',
},
		visibility: {
	type: 'Enum',
},
		manga: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
},
},
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;