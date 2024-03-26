

export type ChapterRequest = {
	title?: string | null;
	volume?: string | null;
	chapter?: string | null;
	translatedLanguage?: string;
	groups?: Array<string>;
	version?: number;
};

