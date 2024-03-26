

export type ChapterAttributes = {
	title?: string | null;
	volume?: string | null;
	chapter?: string | null;
	/**
	 * Count of readable images for this chapter
	 */
	pages?: number;
	translatedLanguage?: string;
	uploader?: string;
	/**
	 * Denotes a chapter that links to an external source.
	 */
	externalUrl?: string | null;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
	publishAt?: string;
	readableAt?: string;
};

