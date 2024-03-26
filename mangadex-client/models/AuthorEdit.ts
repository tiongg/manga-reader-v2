import type { LocalizedString } from './LocalizedString';

export type AuthorEdit = {
	name?: string;
	biography?: LocalizedString;
	twitter?: string | null;
	pixiv?: string | null;
	melonBook?: string | null;
	fanBox?: string | null;
	booth?: string | null;
	nicoVideo?: string | null;
	skeb?: string | null;
	fantia?: string | null;
	tumblr?: string | null;
	youtube?: string | null;
	weibo?: string | null;
	naver?: string | null;
	website?: string | null;
	version: number;
};

