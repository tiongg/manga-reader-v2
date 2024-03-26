export const $MangaCreate = {
	type: 'all-of',
	contains: [{
	type: 'MangaRequest',
}, {
	properties: {
	},
}],
} as const;