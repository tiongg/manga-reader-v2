import React from 'react';
import { ScrollView, Text, View, VStack } from '@gluestack-ui/themed';
import { useQueries } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PageSpinner from '@/components/PageSpinner';
import TopInset from '@/components/TopInset';
import { colors } from '@/config/theme';
import { ScreenProps } from '@/types/navigation/nav-params';
import { getLastReadChapter } from '@/utils/get-last-read-chapter';
import {
  getChaptersQuery,
  getFollowStatusQuery,
  getMangaQuery,
  getReadMarkersQuery,
} from '@/utils/query-options';
import MangaAuthorDetail from './components/MangaAuthorDetail';
import MangaChaptersView from './components/MangaChaptersView';
import MangaDescriptionView from './components/MangaDescriptionView';
import MangaDetailView from './components/MangaDetailView';
import MangaHeaderBar from './components/MangaHeaderBar';
import MangaRelatedMangaView from './components/MangaRelatedMangaView';

export type MangaDetailsPageProps = { mangaId: string; isDownloaded: boolean };

export default function MangaDetailsPage({
  route,
}: ScreenProps<'MangaDetails'>) {
  const {
    params: { mangaId, isDownloaded },
  } = route;
  const inset = useSafeAreaInsets();

  const res = useQueries({
    queries: [
      getMangaQuery(mangaId, isDownloaded),
      getChaptersQuery(mangaId, isDownloaded),
      getReadMarkersQuery(mangaId, isDownloaded),
      getFollowStatusQuery(mangaId, isDownloaded),
    ],
  });
  const [
    { data: manga },
    { data: chapters },
    { data: readChapters },
    { data: followStatus },
  ] = res;

  if (res.some((r) => r.isLoading)) {
    return <PageSpinner insetTop />;
  }

  if (!manga || !chapters || !readChapters || followStatus === undefined) {
    return <Text>Error, something is null...</Text>;
  }

  const lastReadChapter = getLastReadChapter(chapters, readChapters);

  return (
    <>
      <TopInset />
      <View
        paddingBottom={inset.bottom}
        flex={1}
        backgroundColor={colors.backgroundDark900}
      >
        <MangaHeaderBar manga={manga} isDownloaded={isDownloaded} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack flex={1} backgroundColor={colors.backgroundDark950} gap="$4">
            <MangaDetailView
              manga={manga}
              chapters={chapters}
              lastReadChapter={lastReadChapter}
              isFollowing={followStatus}
              isDownloaded={isDownloaded}
            />
            <MangaChaptersView
              manga={manga}
              chapters={chapters}
              lastReadChapter={lastReadChapter}
              isDownloaded={isDownloaded}
            />
            <MangaDescriptionView manga={manga} />
            {!isDownloaded && (
              <>
                <MangaAuthorDetail manga={manga} />
                <MangaRelatedMangaView manga={manga} />
              </>
            )}
          </VStack>
        </ScrollView>
      </View>
    </>
  );
}
