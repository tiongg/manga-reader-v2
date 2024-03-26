export const $Report = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'ReportAttributes',
},
		relationships: {
	type: 'array',
	contains: {
		type: 'Relationship',
	},
},
	},
} as const;