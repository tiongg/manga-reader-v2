export const $ChapterAttributes = {
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
		pages: {
	type: 'number',
	description: `Count of readable images for this chapter`,
},
		translatedLanguage: {
	type: 'string',
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
		uploader: {
	type: 'string',
	format: 'uuid',
},
		externalUrl: {
	type: 'string',
	description: `Denotes a chapter that links to an external source.`,
	isNullable: true,
	maxLength: 512,
	pattern: '^https?://',
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
		publishAt: {
	type: 'string',
},
		readableAt: {
	type: 'string',
},
	},
} as const;