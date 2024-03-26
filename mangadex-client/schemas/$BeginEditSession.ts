export const $BeginEditSession = {
	properties: {
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;