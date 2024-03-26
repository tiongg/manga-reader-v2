import type { UploadSessionAttributes } from './UploadSessionAttributes';

export type UploadSession = {
	id?: string;
	type?: 'upload_session';
	attributes?: UploadSessionAttributes;
};


