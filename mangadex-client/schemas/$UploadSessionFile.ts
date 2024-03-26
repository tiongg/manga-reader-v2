export const $UploadSessionFile = {
	properties: {
		id: {
	type: 'string',
	format: 'uuid',
},
		type: {
	type: 'Enum',
},
		attributes: {
	type: 'UploadSessionFileAttributes',
},
	},
} as const;