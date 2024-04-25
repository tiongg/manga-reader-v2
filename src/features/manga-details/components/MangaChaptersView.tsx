import { Ionicons } from '@expo/vector-icons';
import { Box, Pressable, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Chapter, Manga } from 'mangadex-client';
import { match } from 'ts-pattern';

import { colors, theme } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { downloadManga } from '@/utils/download-calls';

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
      <Text color={colors.textDark0} paddingVertical="$2">
        No chapters read yet!
      </Text>
    );
  }

  const lastReadChapterNumber = lastRead.attributes?.chapter ?? null;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MangaReader', {
          mangaId: mangaId,
          chapterId: lastRead.id!,
        });
      }}
    >
      <Text color={colors.textDark0} paddingBottom="$1">
        {match(lastReadChapterNumber)
          .with(null, () => 'Oneshot')
          .otherwise((x) => `Chapter ${x}`)}
      </Text>
      <Text color={colors.textDark400} fontSize="$sm">
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

  const { isLoading: isDownloadingManga, refetch: triggerDownloadManga } =
    useQuery({
      queryKey: ['has-downloaded-manga', mangaId],
      queryFn: () => downloadManga(mangaId),
      enabled: false,
      retry: false,
      staleTime: 0,
    });

  return (
    <VStack rowGap="$4" backgroundColor={colors.backgroundDark900} padding="$4">
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Text color={colors.textDark0} fontSize="$lg" fontWeight="600">
          Chapters
        </Text>
        {isDownloadingManga ? (
          <Spinner />
        ) : (
          <Pressable
            onPress={() => {
              triggerDownloadManga();
            }}
          >
            <Ionicons
              name="download-outline"
              color={colors.textDark0}
              size={theme.tokens.fontSizes['lg']}
            />
          </Pressable>
        )}
      </Box>
      <Box
        padding="$5"
        borderRadius="$md"
        backgroundColor={colors.backgroundDark800}
      >
        <Text
          color={colors.textDark0}
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
        backgroundColor={colors.backgroundDark600}
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
