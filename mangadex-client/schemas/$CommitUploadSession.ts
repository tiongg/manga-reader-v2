export const $CommitUploadSession = {
	properties: {
		chapterDraft: {
	type: 'ChapterDraft',
},
		pageOrder: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
},
	},
} as const;