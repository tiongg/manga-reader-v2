export const $SendAccountActivationCode = {
	properties: {
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
},
	},
} as const;