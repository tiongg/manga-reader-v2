

export type ForumsThreadResponse = {
	result?: string;
	response?: string;
	data?: {
type?: string;
/**
 * The id for the thread on the forums, accessible at `https://forums.mangadex.org/threads/:id`
 */
id?: number;
attributes?: {
/**
 * The number of replies so far in the forums thread returned
 */
repliesCount?: number;
};
};
};

