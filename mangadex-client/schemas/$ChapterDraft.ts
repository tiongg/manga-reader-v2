export const $ChapterDraft = {
	properties: {
		volume: {
	type: 'string',
	isRequired: true,
	isNullable: true,
	maxLength: 8,
	pattern: '^((0|[1-9]\\d*)(\\.\\d+)?[a-z]?)?$',
},
		chapter: {
	type: 'string',
	isRequired: true,
	isNullable: true,
	maxLength: 8,
	pattern: '^((0|[1-9]\\d*)(\\.\\d+)?[a-z]?)?$',
},
		title: {
	type: 'string',
	isRequired: true,
	isNullable: true,
	maxLength: 255,
},
		translatedLanguage: {
	type: 'string',
	isRequired: true,
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
		externalUrl: {
	type: 'string',
	isNullable: true,
	maxLength: 512,
	pattern: '^https?://',
},
		publishAt: {
	type: 'string',
	pattern: '^\\d{4}-[0-1]\\d-([0-2]\\d|3[0-1])T([0-1]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$',
},
	},
} as const;