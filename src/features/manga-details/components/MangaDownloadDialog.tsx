import { memo, useState } from 'react';
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
import { colors } from '@/config/theme';
import { downloadMangaChapters } from '@/utils/download-calls';
import { getChapterTitle } from '@/utils/get-chapter-title';
import { getChaptersQuery } from '@/utils/query-options';
import { useBoolean } from '@/utils/use-boolean';

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

  const mangaId = manga.id!;
  const selectedChapterIds = new Set<string>();

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
          queryKey: ['chapters', mangaId, true],
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
    selectedChapterIds.clear();
  };

  return (
    <AlertDialogContent height="60%" backgroundColor="$backgroundDark700">
      <AlertDialogHeader justifyContent="space-evenly" paddingHorizontal="$6">
        <Pressable onPress={() => hideDownloadDialog()}>
          <Ionicons name="close" color={colors.textDark0} size={20} />
        </Pressable>
        <Text
          color={colors.textDark0}
          fontWeight="$600"
          textAlign="center"
          width="$full"
        >
          Download Chapters
        </Text>
        <Pressable onPress={() => {}}>
          <Ionicons name="checkmark-done" color={colors.textDark0} size={20} />
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
            onSelected={(chapter) => {
              const chapterId = chapter.id!;
              if (selectedChapterIds.has(chapterId)) {
                selectedChapterIds.delete(chapterId);
              } else {
                selectedChapterIds.add(chapterId);
              }
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
  onSelected,
  downloadProgress,
  isDownloaded,
}: {
  chapter: Chapter;
  onSelected: (chapter: Chapter) => void;
  downloadProgress: number;
  isDownloaded: boolean;
}) {
  const chapterTitle = getChapterTitle(chapter);
  const { value: isSelected, toggle: toggleSelected } = useBoolean();

  return (
    <Pressable
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomColor="$borderDark700"
      borderBottomWidth={1}
      disabled={isDownloaded}
      onPress={() => {
        toggleSelected();
        onSelected(chapter);
      }}
    >
      <HStack gap="$1">
        {isSelected && !isDownloaded && (
          <Ionicons
            name="checkmark-outline"
            style={{
              marginVertical: 'auto',
              color: colors.btn,
              alignSelf: 'center',
            }}
          />
        )}
        <Text
          numberOfLines={1}
          color={isDownloaded ? colors.textDark500 : colors.textDark100}
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
