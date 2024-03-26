export const $CheckResponse = {
	properties: {
		result: {
	type: 'string',
},
		isAuthenticated: {
	type: 'boolean',
},
		roles: {
	type: 'array',
	contains: {
	type: 'string',
},
},
		permissions: {
	type: 'array',
	contains: {
	type: 'string',
},
},
	},
} as const;