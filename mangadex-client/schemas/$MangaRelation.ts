export const $MangaRelation = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'MangaRelationAttributes',
},
		relationships: {
	type: 'array',
	contains: {
		type: 'Relationship',
	},
},
	},
} as const;