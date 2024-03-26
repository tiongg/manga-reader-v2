

export type UploadSessionFileAttributes = {
	originalFileName?: string;
	fileHash?: string;
	fileSize?: number;
	mimeType?: string;
	source?: 'local' | 'remote';
	version?: number;
};


