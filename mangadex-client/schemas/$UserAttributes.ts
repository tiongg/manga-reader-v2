export const $UserAttributes = {
	properties: {
		username: {
	type: 'string',
},
		roles: {
	type: 'array',
	contains: {
	type: 'string',
},
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;