export const $ApiClientCreate = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
	maxLength: 32,
	minLength: 5,
},
		description: {
	type: 'string',
	isNullable: true,
	maxLength: 1024,
},
		profile: {
	type: 'Enum',
	isRequired: true,
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;