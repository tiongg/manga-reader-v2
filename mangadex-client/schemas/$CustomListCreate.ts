export const $CustomListCreate = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
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
	minimum: 1,
},
	},
} as const;