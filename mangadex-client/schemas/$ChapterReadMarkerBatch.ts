export const $ChapterReadMarkerBatch = {
	type: 'any-of',
	contains: [{
	properties: {
	},
}, {
	properties: {
	},
}, {
	properties: {
		chapterIdsRead: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
},
		chapterIdsUnread: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
},
	},
}],
} as const;