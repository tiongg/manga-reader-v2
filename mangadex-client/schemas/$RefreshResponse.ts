export const $RefreshResponse = {
	properties: {
		result: {
	type: 'Enum',
	isRequired: true,
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
		message: {
	type: 'string',
},
	},
} as const;