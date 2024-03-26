export const $CoverAttributes = {
	properties: {
		volume: {
	type: 'string',
	isNullable: true,
},
		fileName: {
	type: 'string',
},
		description: {
	type: 'string',
	isNullable: true,
},
		locale: {
	type: 'string',
	isNullable: true,
},
		version: {
	type: 'number',
	minimum: 1,
},
		createdAt: {
	type: 'string',
},
		updatedAt: {
	type: 'string',
},
	},
} as const;