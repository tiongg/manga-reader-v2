export const $MangaRelationRequest = {
	properties: {
		targetManga: {
	type: 'string',
	format: 'uuid',
},
		relation: {
	type: 'Enum',
},
	},
} as const;