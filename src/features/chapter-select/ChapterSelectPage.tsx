import { ScrollView, Spinner, Text, View, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TopInset from '@/components/TopInset';
import { colors } from '@/config/theme';
import { ScreenProps } from '@/types/navigation/nav-params';
import { useGetMangaAndChapters, useGetReadMarkers } from '@/utils/queries';
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

  const {
    manga: { data: manga, isLoading: isLoadingManga },
    chapters: { data: chapters, isLoading: isLoadingChapters },
  } = useGetMangaAndChapters(mangaId);
  const { data: readChapters, isLoading: isLoadingRead } =
    useGetReadMarkers(mangaId);

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
      <View paddingBottom={inset.bottom} flex={1} backgroundColor={colors.bg2}>
        <MangaHeaderBar manga={manga} />
        <ScrollView>
          <Text color={colors.words1} padding="$3.5" fontWeight="600">
            {chapters.length} chapters
          </Text>
          <VStack flex={1} backgroundColor={colors.bg2}>
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
