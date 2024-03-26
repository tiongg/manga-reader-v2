

export type CreateScanlationGroup = {
	name: string;
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	inactive?: boolean;
	publishDelay?: string | null;
};

