export const $LoginResponse = {
	properties: {
		result: {
	type: 'Enum',
},
		token: {
	properties: {
		session: {
	type: 'string',
},
		refresh: {
	type: 'string',
},
	},
},
	},
} as const;