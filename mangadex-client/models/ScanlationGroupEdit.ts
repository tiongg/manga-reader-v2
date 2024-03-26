

export type ScanlationGroupEdit = {
	name?: string;
	leader?: string;
	members?: Array<string>;
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	focusedLanguages?: Array<string> | null;
	inactive?: boolean;
	locked?: boolean;
	publishDelay?: string;
	version: number;
};

