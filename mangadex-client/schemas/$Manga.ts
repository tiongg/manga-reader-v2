export const $Manga = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'MangaAttributes',
},
		relationships: {
	type: 'array',
	contains: {
		type: 'Relationship',
	},
},
	},
} as const;