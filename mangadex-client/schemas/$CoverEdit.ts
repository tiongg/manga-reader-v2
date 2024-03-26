export const $CoverEdit = {
	properties: {
		volume: {
	type: 'string',
	isRequired: true,
	isNullable: true,
	maxLength: 8,
},
		description: {
	type: 'string',
	isNullable: true,
	maxLength: 512,
},
		locale: {
	type: 'string',
	isNullable: true,
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;