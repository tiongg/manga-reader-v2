import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Box, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import { useQueries } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { match } from 'ts-pattern';

import PageSpinner from '@/components/PageSpinner';
import TopInset from '@/components/TopInset';
import { colors } from '@/config/theme';
import { ScreenProps } from '@/types/navigation/nav-params';
import {
  getChapterImagesQuery,
  getChaptersQuery,
  getMangaQuery,
} from '@/utils/query-options';
import { markChapterAsRead } from '@/utils/service-calls';
import { useBoolean } from '@/utils/use-boolean';
import ChapterEdgeMarker from './MangaReaderChapterEdgeMarker';
import EndOfManga from './MangaReaderEndOfManga';
import MangaReaderOverlay from './MangaReaderOverlay';
import PageItemMemo from './MangaReaderPageItem';

export type MangaReaderPageProps = {
  mangaId: string;
  chapterId: string;
};

export default function MangaReaderPage({
  route,
  navigation,
}: ScreenProps<'MangaReader'>) {
  const {
    params: { chapterId, mangaId },
  } = route;
  const inset = useSafeAreaInsets();
  const toast = useToast();
  const {
    value: isShowingOverlay,
    toggle: toggleOverlay,
    setFalse: hideOverlay,
  } = useBoolean();
  const flatListRef = useRef<FlatList>(null);

  //Pages indexed 0
  const [currentPage, setCurrentPage] = useState(0);

  //Queries
  const [
    { data: manga, isLoading: isMangaLoading },
    { data: chapters, isLoading: isChaptersLoading },
    { data: pageUrls, isLoading: isLoadingPages },
  ] = useQueries({
    queries: [
      getMangaQuery(mangaId),
      getChaptersQuery(mangaId),
      getChapterImagesQuery(chapterId),
    ],
  });

  //Scroll back to start when chapter changes
  const startAtPage = useRef(0);
  useEffect(() => {
    if (!flatListRef.current) return;
    if (!pageUrls) return;

    flatListRef.current.scrollToIndex({
      index: startAtPage.current,
      animated: false,
    });
  }, [pageUrls]);

  const calculateCurrentIndex = (currentX: number) => {
    const deviceWidth = Dimensions.get('window').width;
    const currentPage = Math.round(currentX / deviceWidth);
    return currentPage;
  };

  if (isLoadingPages || isMangaLoading || isChaptersLoading) {
    return <PageSpinner insetTop bgColor={colors.backgroundDark950} />;
  }

  if (!manga || !pageUrls || !chapters) {
    return (
      <Box>
        <Text>Something is null...</Text>
      </Box>
    );
  }

  const currentChapterIndex = chapters.findIndex(
    (chapter) => chapter.id === chapterId
  );
  if (currentChapterIndex === -1) {
    return (
      <Box>
        <Text>Something went wrong!</Text>
      </Box>
    );
  }
  const currentChapter = chapters[currentChapterIndex];
  const nextChapter = chapters[currentChapterIndex - 1];
  const prevChapter = chapters[currentChapterIndex + 1];

  return (
    <>
      <TopInset />
      <FlatList<string>
        ref={flatListRef}
        style={{
          paddingBottom: inset.bottom,
          backgroundColor: colors.backgroundDark950,
        }}
        horizontal
        inverted
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollsToTop={false}
        onScrollToIndexFailed={(_info) => {}}
        data={[...pageUrls, ...(nextChapter ? ['marker'] : ['end_manga'])]}
        renderItem={({ item, index }) =>
          match(item)
            .with('marker', () => <ChapterEdgeMarker />)
            .with('end_manga', () => <EndOfManga mangaId={mangaId} />)
            .otherwise(() => (
              <PageItemMemo
                url={item}
                index={index}
                onPress={toggleOverlay}
                key={index}
              />
            ))
        }
        keyExtractor={(x, i) => `page-${i}`}
        onMomentumScrollEnd={(event) => {
          const currentX = event.nativeEvent.contentOffset.x;
          const currentPage = calculateCurrentIndex(currentX);
          setCurrentPage(currentPage);
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          //Load next chapter
          //Triggers on last_item
          markChapterAsRead(mangaId, chapterId);
          //End of manga
          if (!nextChapter) {
            return;
          }

          startAtPage.current = 1;
          navigation.setParams({
            chapterId: nextChapter?.id!,
          });
          toast.show({
            placement: 'bottom',
            render: ({ id }) => (
              <Toast nativeID={`toast-${id}`}>
                <ToastTitle>New chapter!</ToastTitle>
              </Toast>
            ),
          });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onTouchMove={hideOverlay}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
      />
      {isShowingOverlay && (
        <MangaReaderOverlay
          manga={manga}
          chapter={currentChapter}
          currentPage={currentPage}
          totalPages={pageUrls?.length ?? -1}
        />
      )}
    </>
  );
}
