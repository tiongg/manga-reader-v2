export const $ChapterEdit = {
	type: 'all-of',
	contains: [{
	type: 'ChapterRequest',
}, {
	properties: {
	},
}],
} as const;