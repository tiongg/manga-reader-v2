export const $ScanlationGroupAttributes = {
	properties: {
		name: {
	type: 'string',
},
		altNames: {
	type: 'array',
	contains: {
		type: 'LocalizedString',
	},
},
		website: {
	type: 'string',
	isNullable: true,
},
		ircServer: {
	type: 'string',
	isNullable: true,
},
		ircChannel: {
	type: 'string',
	isNullable: true,
},
		discord: {
	type: 'string',
	isNullable: true,
},
		contactEmail: {
	type: 'string',
	isNullable: true,
},
		description: {
	type: 'string',
	isNullable: true,
},
		twitter: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://',
},
		mangaUpdates: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	maxLength: 128,
	pattern: '^https:\\/\\/www\\.mangaupdates\\.com\\/(group|publisher)(s\\.html\\?id=\\d+|\\/[\\w-]+\\/?([\\w-]+)?(\\/)?)$',
},
		focusedLanguage: {
	type: 'array',
	contains: {
	type: 'string',
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
	isNullable: true,
},
		locked: {
	type: 'boolean',
},
		official: {
	type: 'boolean',
},
		verified: {
	type: 'boolean',
},
		inactive: {
	type: 'boolean',
},
		exLicensed: {
	type: 'boolean',
},
		publishDelay: {
	type: 'string',
	description: `Should respected ISO 8601 duration specification: https://en.wikipedia.org/wiki/ISO_8601#Durations`,
	pattern: '^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$',
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