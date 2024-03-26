export const $MappingIdAttributes = {
	properties: {
		type: {
	type: 'Enum',
},
		legacyId: {
	type: 'number',
},
		newId: {
	type: 'string',
	format: 'uuid',
},
	},
} as const;