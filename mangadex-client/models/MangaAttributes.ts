import type { LocalizedString } from './LocalizedString';
import type { Tag } from './Tag';

export type MangaAttributes = {
	title?: LocalizedString;
	altTitles?: Array<LocalizedString>;
	description?: LocalizedString;
	isLocked?: boolean;
	links?: Record<string, string>;
	originalLanguage?: string;
	lastVolume?: string | null;
	lastChapter?: string | null;
	publicationDemographic?: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null;
	status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus';
	/**
	 * Year of release
	 */
	year?: number | null;
	contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
	chapterNumbersResetOnNewVolume?: boolean;
	availableTranslatedLanguages?: unknown[];
	latestUploadedChapter?: string;
	tags?: Array<Tag>;
	state?: 'draft' | 'submitted' | 'published' | 'rejected';
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};





