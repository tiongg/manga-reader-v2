export const $ApiClientEdit = {
	properties: {
		description: {
	type: 'string',
	isNullable: true,
},
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;