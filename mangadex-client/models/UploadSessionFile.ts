import type { UploadSessionFileAttributes } from './UploadSessionFileAttributes';

export type UploadSessionFile = {
	id?: string;
	type?: 'upload_session_file';
	attributes?: UploadSessionFileAttributes;
};


