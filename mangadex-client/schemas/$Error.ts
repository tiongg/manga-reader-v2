export const $Error = {
	properties: {
		id: {
	type: 'string',
},
		status: {
	type: 'number',
},
		title: {
	type: 'string',
},
		detail: {
	type: 'string',
	isNullable: true,
},
		context: {
	type: 'string',
	isNullable: true,
},
	},
} as const;