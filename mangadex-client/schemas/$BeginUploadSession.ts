export const $BeginUploadSession = {
	properties: {
		groups: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
	isRequired: true,
},
		manga: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
	},
} as const;