import type { LocalizedString } from './LocalizedString';

export type ScanlationGroupAttributes = {
	name?: string;
	altNames?: Array<LocalizedString>;
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	focusedLanguage?: Array<string> | null;
	locked?: boolean;
	official?: boolean;
	verified?: boolean;
	inactive?: boolean;
	exLicensed?: boolean;
	/**
	 * Should respected ISO 8601 duration specification: https://en.wikipedia.org/wiki/ISO_8601#Durations
	 */
	publishDelay?: string;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};

