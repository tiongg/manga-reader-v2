import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Chapter, Manga } from 'mangadex-client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FadeInView from '@/components/FadeInView';
import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getChapterTitle } from '@/utils/get-chapter-title';
import { getMangaTitle } from '@/utils/get-manga-title';
import { localeOrFirst } from '@/utils/locale-or-first';

type TopOverlayProps = {
  manga: Manga;
  chapter: Chapter;
};

type BottomOverlayProps = {
  currentPage: number;
  totalPages: number;
};

export type MangaReaderOverlayProps = TopOverlayProps & BottomOverlayProps;

function BottomOverlay({ currentPage, totalPages }: BottomOverlayProps) {
  const inset = useSafeAreaInsets();

  return (
    <FadeInView
      style={{
        position: 'absolute',
        width: '100%',
        height: 30 + inset.bottom,
        bottom: 0,
        backgroundColor: colors.backgroundDark900,
      }}
    >
      <Text color={colors.textDark0} textAlign="center" paddingTop="$3">
        {currentPage + 1} / {totalPages}
      </Text>
      <Box height={inset.bottom} />
    </FadeInView>
  );
}

function TopOverlay({ manga, chapter }: TopOverlayProps) {
  const navigation = useNavigation<FromMain>();
  const inset = useSafeAreaInsets();

  const mangaTitle = getMangaTitle(manga);
  const chapterTitle = getChapterTitle(chapter);

  return (
    <FadeInView
      style={{
        position: 'absolute',
        width: '100%',
      }}
    >
      <BlurView
        style={{
          height: 35 + inset.top,
          borderBottomColor: colors.backgroundDark600,
          borderBottomWidth: 1,
          justifyContent: 'center',
          padding: 12,
        }}
        tint="dark"
        intensity={100}
      >
        <Box height={inset.top} />
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text color={colors.btn} fontWeight="400" fontSize="$md">
            Close
          </Text>
        </Pressable>
      </BlurView>
      <BlurView
        style={{ height: 55, justifyContent: 'center', padding: 10 }}
        tint="dark"
        intensity={100}
      >
        <Text
          color={colors.textDark0}
          fontSize="$sm"
          lineHeight="$sm"
          numberOfLines={1}
        >
          {mangaTitle}
        </Text>
        <Text color={colors.textDark400} fontSize="$xs" numberOfLines={1}>
          {chapterTitle}
        </Text>
      </BlurView>
    </FadeInView>
  );
}

export default function MangaReaderOverlay({
  manga,
  chapter,
  currentPage,
  totalPages,
}: MangaReaderOverlayProps) {
  return (
    <>
      <TopOverlay manga={manga} chapter={chapter} />
      <BottomOverlay currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
