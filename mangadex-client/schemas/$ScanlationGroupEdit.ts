export const $ScanlationGroupEdit = {
	properties: {
		name: {
	type: 'string',
},
		leader: {
	type: 'string',
	format: 'uuid',
},
		members: {
	type: 'array',
	contains: {
	type: 'string',
	format: 'uuid',
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
		focusedLanguages: {
	type: 'array',
	contains: {
	type: 'string',
	pattern: '^[a-z]{2}(-[a-z]{2})?$',
},
	isNullable: true,
},
		inactive: {
	type: 'boolean',
},
		locked: {
	type: 'boolean',
},
		publishDelay: {
	type: 'string',
},
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;