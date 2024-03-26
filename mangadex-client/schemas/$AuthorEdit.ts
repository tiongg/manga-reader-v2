export const $AuthorEdit = {
	properties: {
		name: {
	type: 'string',
},
		biography: {
	type: 'LocalizedString',
},
		twitter: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://twitter\\.com(/|$)',
},
		pixiv: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?pixiv\\.net(/|$)',
},
		melonBook: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?melonbooks\\.co\\.jp(/|$)',
},
		fanBox: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?fanbox\\.cc(/|$)',
},
		booth: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?booth\\.pm(/|$)',
},
		nicoVideo: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?nicovideo\\.jp(/|$)',
},
		skeb: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?skeb\\.jp(/|$)',
},
		fantia: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?fantia\\.jp(/|$)',
},
		tumblr: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?tumblr\\.com(/|$)',
},
		youtube: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://www\\.youtube\\.com(/|$)',
},
		weibo: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?weibo\\.(cn|com)(/|$)',
},
		naver: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://([\\w-]+\\.)?naver\\.com(/|$)',
},
		website: {
	type: 'string',
	isNullable: true,
	format: 'uri',
	pattern: '^https?://',
},
		version: {
	type: 'number',
	isRequired: true,
	minimum: 1,
},
	},
} as const;