export const $ApiClientAttributes = {
	properties: {
		name: {
	type: 'string',
},
		description: {
	type: 'string',
	isNullable: true,
},
		profile: {
	type: 'string',
},
		clientId: {
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