export const $ForumsThreadResponse = {
	properties: {
		result: {
	type: 'string',
},
		response: {
	type: 'string',
},
		data: {
	properties: {
		type: {
	type: 'string',
},
		id: {
	type: 'number',
	description: `The id for the thread on the forums, accessible at \`https://forums.mangadex.org/threads/:id\``,
},
		attributes: {
	properties: {
		repliesCount: {
	type: 'number',
	description: `The number of replies so far in the forums thread returned`,
},
	},
},
	},
},
	},
} as const;