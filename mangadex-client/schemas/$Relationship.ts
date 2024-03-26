export const $Relationship = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'string',
},
		related: {
	type: 'Enum',
},
		attributes: {
	type: 'dictionary',
	contains: {
	properties: {
	},
},
	isNullable: true,
},
	},
} as const;