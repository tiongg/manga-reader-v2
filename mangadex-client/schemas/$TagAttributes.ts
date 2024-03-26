export const $TagAttributes = {
	properties: {
		name: {
	type: 'LocalizedString',
},
		description: {
	type: 'LocalizedString',
},
		group: {
	type: 'Enum',
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;