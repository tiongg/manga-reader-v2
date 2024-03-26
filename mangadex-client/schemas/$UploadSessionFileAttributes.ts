export const $UploadSessionFileAttributes = {
	properties: {
		originalFileName: {
	type: 'string',
},
		fileHash: {
	type: 'string',
},
		fileSize: {
	type: 'number',
},
		mimeType: {
	type: 'string',
},
		source: {
	type: 'Enum',
},
		version: {
	type: 'number',
	minimum: 1,
},
	},
} as const;