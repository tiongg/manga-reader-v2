export const $ChapterRequest = {
	properties: {
		title: {
	type: 'string',
	isNullable: true,
	maxLength: 255,
},
		volume: {
	type: 'string',
	isNullable: true,
},
		chapter: {
	type: 'string',
	isNullable: true,
	maxLength: 8,
},
		translatedLanguage: {
	type: 'string',
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
		groups: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
	maxLength: 36,
	minLength: 36,
},
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;