export const $CustomListAttributes = {
	properties: {
		name: {
	type: 'string',
},
		visibility: {
	type: 'Enum',
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;