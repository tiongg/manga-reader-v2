

export type Relationship = {
	id?: string;
	type?: string;
	/**
	 * Related Manga type, only present if you are on a Manga entity and a Manga relationship
	 */
	related?: 'monochrome' | 'main_story' | 'adapted_from' | 'based_on' | 'prequel' | 'side_story' | 'doujinshi' | 'same_franchise' | 'shared_universe' | 'sequel' | 'spin_off' | 'alternate_story' | 'alternate_version' | 'preserialization' | 'colored' | 'serialization';
	/**
	 * If Reference Expansion is applied, contains objects attributes
	 */
	attributes?: Record<string, unknown> | null;
};


