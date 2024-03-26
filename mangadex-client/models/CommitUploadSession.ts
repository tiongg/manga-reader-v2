import type { ChapterDraft } from './ChapterDraft';

export type CommitUploadSession = {
	chapterDraft?: ChapterDraft;
	/**
	 * ordered list of Upload Session File ids
	 */
	pageOrder?: Array<string>;
};

