export const $CreateScanlationGroup = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
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
	pattern: '^https?://twitter\\.com',
},
		mangaUpdates: {
	type: 'string',
	isNullable: true,
	maxLength: 128,
	pattern: '^https:\\/\\/www\\.mangaupdates\\.com\\/(group|publisher)(s\\.html\\?id=\\d+|\\/[\\w-]+\\/?([\\w-]+)?(\\/)?)$',
},
		inactive: {
	type: 'boolean',
},
		publishDelay: {
	type: 'string',
	isNullable: true,
	pattern: '^P(([1-9]|[1-9][0-9])D)?(([1-9])W)?(T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$',
},
	},
} as const;