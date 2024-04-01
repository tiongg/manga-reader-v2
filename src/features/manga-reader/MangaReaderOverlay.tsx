import { memo } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Center,
  HStack,
  Pressable,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { Chapter, Manga } from 'mangadex-client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FadeInView from '@/components/FadeInView';
import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getChapterTitle } from '@/utils/get-chapter-title';
import { getMangaTitle } from '@/utils/get-manga-title';
import { getReadMarkersQuery } from '@/utils/query-options';
import { useBoolean } from '@/utils/use-boolean';

type TopOverlayProps = {
  manga: Manga;
  chapter: Chapter;
  allChapters: Chapter[];
};

type BottomOverlayProps = {
  currentPage: number;
  totalPages: number;
};

type ChapterSelectDialogProps = {
  currentChapter: Chapter;
  allChapters: Chapter[];
  mangaId: string;
  isOpen: boolean;
  onClose: () => void;
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

function ChapterSelectItem({
  chapter,
  isRead,
  isCurrentChapter,
  onChapterSelect,
}: {
  chapter: Chapter;
  isRead: boolean;
  isCurrentChapter: boolean;
  onChapterSelect: (chapter: Chapter) => void;
}) {
  const text = getChapterTitle(chapter);
  return (
    <Pressable
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomColor="$borderDark700"
      borderBottomWidth={1}
      onPress={() => onChapterSelect(chapter)}
    >
      <HStack gap="$1">
        {isCurrentChapter && (
          <Ionicons
            name="chevron-forward"
            style={{
              marginVertical: 'auto',
              color: colors.btn,
              alignSelf: 'center',
            }}
          />
        )}
        <Text
          numberOfLines={1}
          color={isRead ? colors.textDark400 : colors.textDark100}
        >
          {text}
        </Text>
      </HStack>
    </Pressable>
  );
}
const ChapterSelectItemMemo = memo(ChapterSelectItem);

function ChapterSelectDialog({
  isOpen,
  onClose,
  allChapters,
  currentChapter,
  mangaId,
}: ChapterSelectDialogProps) {
  const navigation = useNavigation<FromMain>();
  const onChapterSelect = (chapter: Chapter) => {
    onClose();
    navigation.navigate('MangaReader', {
      chapterId: chapter.id!,
      mangaId,
    });
  };

  const { data: readChapters, isPending: isPendingReadMarkers } = useQuery(
    getReadMarkersQuery(mangaId)
  );

  //Shouldn't be happening
  //Should be reading from cache
  if (isPendingReadMarkers) {
    return (
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogContent height="60%" justifyContent="center">
          <Spinner />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (!readChapters) {
    return (
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogContent height="60%" justifyContent="center">
          <Text>Something is null...</Text>
        </AlertDialogContent>
        <AlertDialogFooter>
          <Pressable width="$full" onPress={onClose}>
            <Text textAlign="center" color={colors.btn}>
              Close
            </Text>
          </Pressable>
        </AlertDialogFooter>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogContent height="60%" backgroundColor="$backgroundDark700">
        <AlertDialogHeader>
          <Text
            color={colors.textLight0}
            fontWeight="$600"
            textAlign="center"
            width="$full"
          >
            Jump To Chapter
          </Text>
        </AlertDialogHeader>
        <FlatList<Chapter>
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={allChapters}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ChapterSelectItemMemo
              chapter={item}
              isRead={readChapters.has(item.id!)}
              isCurrentChapter={item.id === currentChapter.id}
              onChapterSelect={onChapterSelect}
            />
          )}
        />
        <AlertDialogFooter>
          <Pressable width="$full" onPress={onClose}>
            <Text textAlign="center" color={colors.btn}>
              Close
            </Text>
          </Pressable>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TopOverlay({ manga, chapter, allChapters }: TopOverlayProps) {
  const navigation = useNavigation<FromMain>();
  const inset = useSafeAreaInsets();
  const {
    value: isShowingChapterSelect,
    setTrue: showChapterSelect,
    setFalse: hideChapterSelect,
  } = useBoolean(false);

  const mangaTitle = getMangaTitle(manga);
  const chapterTitle = getChapterTitle(chapter);

  return (
    <>
      <FadeInView
        style={{
          position: 'absolute',
          width: '100%',
        }}
      >
        <BlurView tint="dark" intensity={100}>
          <Box height={inset.top} />
          <Pressable
            height={35}
            borderBottomWidth={1}
            borderBottomColor="$backgroundDark600"
            paddingHorizontal="$4"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text color={colors.btn} fontWeight="400" fontSize="$md">
              Close
            </Text>
          </Pressable>
          <Box height={55} justifyContent="center" paddingHorizontal="$2.5">
            <Text
              color={colors.textDark0}
              fontSize="$sm"
              lineHeight="$sm"
              numberOfLines={1}
            >
              {mangaTitle}
            </Text>
            <Pressable onPress={showChapterSelect}>
              <HStack gap="$1">
                <Text
                  color={colors.textDark400}
                  fontSize="$xs"
                  numberOfLines={1}
                  maxWidth="$2/3"
                >
                  {chapterTitle}
                </Text>
                <Ionicons
                  name="caret-down"
                  size={14}
                  style={{
                    color: colors.textDark400,
                    marginVertical: 'auto',
                    alignSelf: 'center',
                  }}
                />
              </HStack>
            </Pressable>
          </Box>
        </BlurView>
      </FadeInView>
      <ChapterSelectDialog
        mangaId={manga.id!}
        allChapters={allChapters}
        currentChapter={chapter}
        isOpen={isShowingChapterSelect}
        onClose={hideChapterSelect}
      />
    </>
  );
}

export default function MangaReaderOverlay(props: MangaReaderOverlayProps) {
  return (
    <>
      <TopOverlay {...props} />
      <BottomOverlay {...props} />
    </>
  );
}
