export const $MangaRequest = {
	properties: {
		title: {
	type: 'LocalizedString',
},
		altTitles: {
	type: 'array',
	contains: {
		type: 'LocalizedString',
	},
},
		description: {
	type: 'LocalizedString',
},
		authors: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
},
},
		artists: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
},
},
		links: {
	type: 'dictionary',
	contains: {
	type: 'string',
},
},
		originalLanguage: {
	type: 'string',
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
		lastVolume: {
	type: 'string',
	isNullable: true,
},
		lastChapter: {
	type: 'string',
	isNullable: true,
},
		publicationDemographic: {
	type: 'Enum',
	isNullable: true,
},
		status: {
	type: 'Enum',
},
		year: {
	type: 'number',
	description: `Year of release`,
	isNullable: true,
	maximum: 9999,
	minimum: 1,
},
		contentRating: {
	type: 'Enum',
},
		chapterNumbersResetOnNewVolume: {
	type: 'boolean',
},
		tags: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
},
},
		primaryCover: {
	type: 'string',
	isNullable: true,
	format: 'uuid',
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;