import { FlatList } from 'react-native';
import { Spinner, Text, View } from '@gluestack-ui/themed';
import { useQueries } from '@tanstack/react-query';
import { Chapter } from 'mangadex-client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TopInset from '@/components/TopInset';
import { colors } from '@/config/theme';
import { ScreenProps } from '@/types/navigation/nav-params';
import {
  getChaptersQuery,
  getMangaQuery,
  getReadMarkersQuery,
} from '@/utils/query-options';
import MangaHeaderBar from '../manga-details/components/MangaHeaderBar';
import ChapterSelectItemMemo from './ChapterSelectItem';

export type ChapterSelectPageProps = {
  mangaId: string;
};

export default function ChapterSelectPage({
  route,
}: ScreenProps<'ChapterSelect'>) {
  const {
    params: { mangaId },
  } = route;

  const [
    { data: manga, isLoading: isLoadingManga },
    { data: chapters, isLoading: isLoadingChapters },
    { data: readChapters, isLoading: isLoadingRead },
  ] = useQueries({
    queries: [
      getMangaQuery(mangaId),
      getChaptersQuery(mangaId),
      getReadMarkersQuery(mangaId),
    ],
  });

  const inset = useSafeAreaInsets();

  if (isLoadingChapters || isLoadingManga || isLoadingRead) {
    return <Spinner />;
  }

  if (!manga || !chapters || !readChapters) {
    return <Text>Error, something is null...</Text>;
  }

  return (
    <>
      <TopInset />
      <View
        paddingBottom={inset.bottom}
        flex={1}
        backgroundColor={colors.backgroundDark900}
      >
        <MangaHeaderBar manga={manga} />
        <FlatList<Chapter>
          data={chapters}
          ListHeaderComponent={
            <Text color={colors.textDark0} padding="$3.5" fontWeight="600">
              {chapters.length} chapters
            </Text>
          }
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ChapterSelectItemMemo
              chapter={item}
              manga={manga}
              isRead={readChapters.has(item.id!)}
            />
          )}
        />
      </View>
    </>
  );
}
