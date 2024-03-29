import React from 'react';
import { ScrollView, Text, View, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PageSpinner from '@/components/PageSpinner';
import TopInset from '@/components/TopInset';
import { colors } from '@/config/theme';
import { ScreenProps } from '@/types/navigation/nav-params';
import { getLastReadChapter } from '@/utils/get-last-read-chapter';
import {
  useGetFollowStatus,
  useGetMangaAndChapters,
  useGetReadMarkers,
} from '@/utils/queries';
import MangaAuthorDetail from './components/MangaAuthorDetail';
import MangaChaptersView from './components/MangaChaptersView';
import MangaDescriptionView from './components/MangaDescriptionView';
import MangaDetailView from './components/MangaDetailView';
import MangaHeaderBar from './components/MangaHeaderBar';

export type MangaDetailsPageProps = { mangaId: string };

export default function MangaDetailsPage({
  route,
}: ScreenProps<'MangaDetails'>) {
  const {
    params: { mangaId },
  } = route;
  const inset = useSafeAreaInsets();

  const {
    manga: { data: manga, isPending: isPendingManga },
    chapters: { data: chapters, isPending: isPendingChapters },
  } = useGetMangaAndChapters(mangaId);

  const { data: readChapters, isPending: isPendingReadMarkers } =
    useGetReadMarkers(mangaId);

  const { data: followStatus, isPending: isPendingFollowStatus } =
    useGetFollowStatus(mangaId);

  if (
    isPendingChapters ||
    isPendingManga ||
    isPendingReadMarkers ||
    isPendingFollowStatus
  ) {
    return <PageSpinner insetTop />;
  }

  if (!manga || !chapters || !readChapters || followStatus === undefined) {
    return <Text>Error, something is null...</Text>;
  }

  const lastReadChapter = getLastReadChapter(chapters, readChapters);

  return (
    <>
      <TopInset />
      <View paddingBottom={inset.bottom} flex={1} backgroundColor={colors.bg2}>
        <MangaHeaderBar manga={manga} />
        <ScrollView>
          <VStack flex={1} backgroundColor={colors.bg1} gap="$4">
            <MangaDetailView
              manga={manga}
              chapters={chapters}
              lastReadChapter={lastReadChapter}
              isFollowing={followStatus}
            />
            <MangaChaptersView
              manga={manga}
              chapters={chapters}
              lastReadChapter={lastReadChapter}
            />
            <MangaDescriptionView manga={manga} />
            <MangaAuthorDetail manga={manga} />
          </VStack>
        </ScrollView>
      </View>
    </>
  );
}
