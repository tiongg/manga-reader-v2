

/**
 * Comments-related statistics of an entity.
 * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
 * 
 */
export type StatisticsDetailsComments = {
	/**
	 * The id of the thread backing the comments for that entity on the MangaDex Forums.
	 */
	threadId?: number;
	/**
	 * The number of replies on the MangaDex Forums thread backing this entity's comments. This excludes the initial comment that opens the thread, which is created by our systems.
 * 
	 */
	repliesCount?: number;
} | null;

