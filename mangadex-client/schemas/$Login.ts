export const $Login = {
	properties: {
		username: {
	type: 'string',
	maxLength: 64,
	minLength: 1,
},
		email: {
	type: 'string',
},
		password: {
	type: 'string',
	isRequired: true,
	maxLength: 1024,
	minLength: 8,
},
	},
} as const;