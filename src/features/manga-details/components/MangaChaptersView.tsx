import { Ionicons } from '@expo/vector-icons';
import {
  AlertDialog,
  Box,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';
import { match } from 'ts-pattern';

import { colors, theme } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { useBoolean } from '@/utils/use-boolean';
import MangaDownloadDialog from './MangaDownloadDialog';

export type MangaChaptersViewProps = {
  chapters: Chapter[];
  manga: Manga;
  isDownloaded: boolean;
  lastReadChapter?: Chapter;
};

type LastReadChapterProps = {
  lastRead?: Chapter;
  mangaId: string;
  isDownloaded: boolean;
};

function LastReadChapter({
  lastRead,
  mangaId,
  isDownloaded,
}: LastReadChapterProps) {
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
          isDownloaded: isDownloaded,
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
  isDownloaded,
  lastReadChapter,
}: MangaChaptersViewProps) {
  const navigation = useNavigation<FromMain>();
  const mangaId = manga.id!;
  const {
    value: isShowingDownloadDialog,
    setTrue: showDownloadDialog,
    setFalse: hideDownloadDialog,
  } = useBoolean();

  return (
    <VStack rowGap="$4" backgroundColor={colors.backgroundDark900} padding="$4">
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Text color={colors.textDark0} fontSize="$lg" fontWeight="600">
          Chapters
        </Text>
        {!isDownloaded && (
          <>
            <Pressable onPress={showDownloadDialog}>
              <Ionicons
                name="download-outline"
                color={colors.textDark0}
                size={theme.tokens.fontSizes['lg']}
              />
            </Pressable>
            <AlertDialog isOpen={isShowingDownloadDialog}>
              <MangaDownloadDialog
                chapters={chapters}
                manga={manga}
                hideDownloadDialog={hideDownloadDialog}
              />
            </AlertDialog>
          </>
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
        <LastReadChapter
          lastRead={lastReadChapter}
          mangaId={mangaId}
          isDownloaded={isDownloaded}
        />
      </Box>
      <Pressable
        alignItems="center"
        backgroundColor={colors.backgroundDark600}
        padding="$4"
        borderRadius="$md"
        onPress={() =>
          navigation.navigate('ChapterSelect', { mangaId, isDownloaded })
        }
      >
        <Text color={colors.btn} fontSize="$md" fontWeight="600">
          View All {chapters.length} {isDownloaded && 'Downloaded '}Chapters
        </Text>
      </Pressable>
    </VStack>
  );
}
