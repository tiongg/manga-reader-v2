export const $MangaAttributes = {
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
		isLocked: {
	type: 'boolean',
},
		links: {
	type: 'dictionary',
	contains: {
	type: 'string',
},
},
		originalLanguage: {
	type: 'string',
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
},
		contentRating: {
	type: 'Enum',
},
		chapterNumbersResetOnNewVolume: {
	type: 'boolean',
},
		availableTranslatedLanguages: {
	type: 'unknown[]',
},
		latestUploadedChapter: {
	type: 'string',
	format: 'uuid',
},
		tags: {
	type: 'array',
	contains: {
		type: 'Tag',
	},
},
		state: {
	type: 'Enum',
},
		version: {
	type: 'number',
	minimum: 1,
},
		createdAt: {
	type: 'string',
},
		updatedAt: {
	type: 'string',
},
	},
} as const;