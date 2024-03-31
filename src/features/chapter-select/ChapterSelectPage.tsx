import { ScrollView, Spinner, Text, View, VStack } from '@gluestack-ui/themed';
import { useQueries } from '@tanstack/react-query';
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
import ChapterSelectItem from './ChapterSelectItem';

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
        <ScrollView>
          <Text color={colors.textDark0} padding="$3.5" fontWeight="600">
            {chapters.length} chapters
          </Text>
          <VStack flex={1} backgroundColor={colors.backgroundDark900}>
            {chapters.map((chapter) => (
              <ChapterSelectItem
                key={chapter.id!}
                chapter={chapter}
                manga={manga}
                isRead={readChapters.has(chapter.id!)}
              />
            ))}
          </VStack>
        </ScrollView>
      </View>
    </>
  );
}
