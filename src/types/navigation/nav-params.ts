import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ChapterSelectPageProps } from '@/features/chapter-select/ChapterSelectPage';
import { MangaDetailsPageProps } from '@/features/manga-details/MangaDetailsPage';
import { MangaReaderPageProps } from '@/features/manga-reader/MangaReaderPage';

export type ScreenParams = {
  Main: undefined;
  MangaDetails: MangaDetailsPageProps;
  MangaReader: MangaReaderPageProps;
  ChapterSelect: ChapterSelectPageProps;
};

//For typing page props
export type ScreenProps<T extends keyof ScreenParams> = NativeStackScreenProps<
  ScreenParams,
  T
>;

//For useNavigation hook
export type FromStack<T extends keyof ScreenParams> = NativeStackNavigationProp<
  ScreenParams,
  T
>;
export type FromMain = FromStack<'Main'>;

//For main pages (Tabs)
export type PageParams = {
  Updates: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type PageNavigationProps<T extends keyof PageParams> =
  CompositeScreenProps<
    BottomTabScreenProps<PageParams, T>,
    ScreenProps<keyof ScreenParams>
  >;
