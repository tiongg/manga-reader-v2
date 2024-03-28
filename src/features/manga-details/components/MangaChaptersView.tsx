import { Box, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';

export type MangaChaptersViewProps = {
  chapters: Chapter[];
  manga: Manga;
  lastReadChapter?: Chapter;
};

type LastReadChapterProps = {
  lastRead?: Chapter;
  mangaId: string;
};

function LastReadChapter({ lastRead, mangaId }: LastReadChapterProps) {
  const navigation = useNavigation<FromMain>();

  if (!lastRead) {
    return (
      <Text color={colors.words1} paddingVertical="$2">
        No chapters read yet!
      </Text>
    );
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MangaReader', {
          mangaId: mangaId,
          chapterId: lastRead.id!,
        });
      }}
    >
      <Text color={colors.words1} paddingBottom="$1">
        Chapter {lastRead.attributes?.chapter}
      </Text>
      <Text color={colors.words2} fontSize="$sm">
        4 days ago • Page 3
      </Text>
    </Pressable>
  );
}

export default function MangaChaptersView({
  chapters,
  manga,
  lastReadChapter,
}: MangaChaptersViewProps) {
  const navigation = useNavigation<FromMain>();
  const mangaId = manga.id!;

  return (
    <VStack rowGap="$4" backgroundColor={colors.bg2} padding="$4">
      <Text color={colors.words1} fontSize="$lg" fontWeight="600">
        Chapters
      </Text>
      <Box padding="$5" borderRadius="$md" backgroundColor={colors.bg3}>
        <Text
          color={colors.words1}
          fontSize="$lg"
          fontWeight="600"
          paddingBottom="$4"
        >
          Last read
        </Text>
        <LastReadChapter lastRead={lastReadChapter} mangaId={mangaId} />
      </Box>
      <Pressable
        alignItems="center"
        backgroundColor={colors.bg4}
        padding="$4"
        borderRadius="$md"
        onPress={() => navigation.navigate('ChapterSelect', { mangaId })}
      >
        <Text color={colors.btn} fontSize="$md" fontWeight="600">
          View All {chapters.length} Chapters
        </Text>
      </Pressable>
    </VStack>
  );
}
