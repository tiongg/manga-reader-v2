export const $RecoverCompleteBody = {
	properties: {
		newPassword: {
	type: 'string',
	isRequired: true,
	maxLength: 1024,
	minLength: 8,
},
	},
} as const;