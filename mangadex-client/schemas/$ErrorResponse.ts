export const $ErrorResponse = {
	properties: {
		result: {
	type: 'string',
},
		errors: {
	type: 'array',
	contains: {
		type: 'Error',
	},
},
	},
} as const;