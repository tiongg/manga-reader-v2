export const $UploadSessionAttributes = {
	properties: {
		isCommitted: {
	type: 'boolean',
},
		isProcessed: {
	type: 'boolean',
},
		isDeleted: {
	type: 'boolean',
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