import { memo } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  HStack,
  Pressable,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Chapter, Manga } from 'mangadex-client';
import { useImmer } from 'use-immer';

import { queryClient } from '@/config/query-client';
import { colors, theme } from '@/config/theme';
import { downloadMangaChapters } from '@/utils/download-calls';
import { getChapterTitle } from '@/utils/get-chapter-title';
import { getChaptersQuery } from '@/utils/query-options';

export type MangaDownloadDialogProps = {
  chapters: Chapter[];
  manga: Manga;
  hideDownloadDialog: () => void;
};

export default function MangaDownloadDialog({
  chapters,
  manga,
  hideDownloadDialog,
}: MangaDownloadDialogProps) {
  const [downloadProgress, updateDownloadProgress] = useImmer<
    Record<string, number>
  >({});
  const [selectedChapterIds, updateSelectedChapterIds] = useImmer<Set<string>>(
    new Set()
  );

  const mangaId = manga.id!;

  const { mutateAsync: triggerDownloadManga, isPending: isDownloadingManga } =
    useMutation({
      mutationFn: () =>
        downloadMangaChapters(
          mangaId,
          selectedChapterIds,
          (chapterId, current, outOf) => {
            updateDownloadProgress((progress) => {
              progress[chapterId] = (current / outOf) * 100;
            });
          }
        ),
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['downloaded-manga'],
        });
        queryClient.invalidateQueries({
          queryKey: ['downloaded-manga-size'],
        });
        queryClient.invalidateQueries({
          queryKey: ['chapters', mangaId, true],
          exact: true,
        });
      },
    });

  const { data: downloadedChaptersArray } = useQuery(
    getChaptersQuery(mangaId, true)
  );
  const downloadedChapterIds = new Set(
    (downloadedChaptersArray ?? []).map((x) => x.id!)
  );

  const resetDownloadStates = () => {
    updateDownloadProgress(() => ({}));
    updateSelectedChapterIds((curr) => curr.clear());
  };

  const selectAllChapters = () => {
    for (const chapter of chapters) {
      const chapterId = chapter.id!;
      if (downloadedChapterIds.has(chapterId)) continue;
      updateSelectedChapterIds((selectedChapterIds) => {
        selectedChapterIds.add(chapterId);
      });
    }
  };

  return (
    <AlertDialogContent height="60%" backgroundColor="$backgroundDark700">
      <AlertDialogHeader justifyContent="space-evenly" paddingHorizontal="$6">
        <Pressable onPress={() => hideDownloadDialog()}>
          <Ionicons
            name="close"
            color={colors.textDark0}
            size={theme.tokens.fontSizes['2xl']}
          />
        </Pressable>
        <Text
          color={colors.textDark0}
          fontWeight="$600"
          textAlign="center"
          width="$full"
        >
          Download Chapters
        </Text>
        <Pressable onPress={() => selectAllChapters()}>
          <Ionicons
            name="checkmark-done"
            color={colors.textDark0}
            size={theme.tokens.fontSizes['2xl']}
          />
        </Pressable>
      </AlertDialogHeader>
      <FlatList<Chapter>
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={chapters}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <DownloadChapterSelectItemMemo
            chapter={item}
            isSelected={selectedChapterIds.has(item.id!)}
            onSelected={(chapter) => {
              const chapterId = chapter.id!;
              updateSelectedChapterIds((selectedChapterIds) => {
                if (selectedChapterIds.has(chapterId)) {
                  selectedChapterIds.delete(chapterId);
                } else {
                  selectedChapterIds.add(chapterId);
                }
              });
            }}
            downloadProgress={downloadProgress[item.id!] ?? 0}
            isDownloaded={downloadedChapterIds.has(item.id!)}
          />
        )}
      />
      <AlertDialogFooter>
        <Pressable
          width="$full"
          onPress={async () => {
            await triggerDownloadManga();
            resetDownloadStates();
          }}
          disabled={isDownloadingManga}
        >
          {isDownloadingManga ? (
            <Spinner />
          ) : (
            <Text textAlign="center" color={colors.btn}>
              Download Selected
            </Text>
          )}
        </Pressable>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

function DownloadChapterSelectItem({
  chapter,
  isSelected,
  onSelected,
  downloadProgress,
  isDownloaded,
}: {
  chapter: Chapter;
  isSelected: boolean;
  onSelected: (chapter: Chapter) => void;
  downloadProgress: number;
  isDownloaded: boolean;
}) {
  const chapterTitle = getChapterTitle(chapter);

  return (
    <Pressable
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomColor="$borderDark700"
      borderBottomWidth={1}
      disabled={isDownloaded}
      onPress={() => {
        onSelected(chapter);
      }}
    >
      <HStack gap="$2">
        <Ionicons
          name="checkmark-outline"
          style={{
            marginVertical: 'auto',
            color: isSelected && !isDownloaded ? colors.btn : 'transparent',
            alignSelf: 'center',
          }}
          size={theme.tokens.fontSizes['md']}
        />
        <Text
          numberOfLines={1}
          color={isDownloaded ? colors.textDark500 : colors.textDark100}
          flex={1}
          fontSize="$md"
        >
          {chapterTitle}
        </Text>
      </HStack>
      <Box
        width={`${downloadProgress}%`}
        height="$0.5"
        bgColor={colors.textDark300}
      />
    </Pressable>
  );
}
const DownloadChapterSelectItemMemo = memo(DownloadChapterSelectItem);
