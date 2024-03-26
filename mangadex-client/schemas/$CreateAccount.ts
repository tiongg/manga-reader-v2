export const $CreateAccount = {
	properties: {
		username: {
	type: 'string',
	isRequired: true,
	maxLength: 64,
	minLength: 1,
},
		password: {
	type: 'string',
	isRequired: true,
	maxLength: 1024,
	minLength: 8,
},
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
},
	},
} as const;