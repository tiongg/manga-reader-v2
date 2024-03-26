import type { LocalizedString } from './LocalizedString';

export type MangaRequest = {
	title?: LocalizedString;
	altTitles?: Array<LocalizedString>;
	description?: LocalizedString;
	authors?: Array<string>;
	artists?: Array<string>;
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
	tags?: Array<string>;
	primaryCover?: string | null;
	version?: number;
};




