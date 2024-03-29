import { FlatList } from 'react-native';
import { config } from '@gluestack-ui/config';
import { Box, RefreshControl, VStack } from '@gluestack-ui/themed';
import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { Manga } from 'mangadex-client';

import PageSpinner from '@/components/PageSpinner';
import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { getRelationship } from '@/utils/get-relationship';
import { getFeedWithManga } from '@/utils/queries';
import MangaUpdateMemo from './MangaUpdateItem';

export default function UpdatesPage() {
  const { user } = useMangadexAuth();
  const {
    data: feed,
    isLoading: isLoadingFeed,
    isRefetching: isRefetchingFeed,
    refetch: refetchFeed,
    hasNextPage,
    fetchNextPage: fetchNextChapters,
  } = useInfiniteQuery({
    queryKey: ['follows-feed'],
    queryFn: ({ pageParam }) => getFeedWithManga(pageParam),
    enabled: !!user,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.offset! + lastPage.limit!,
  });

  const feedItems = (feed?.pages ?? []).map((page) => page.data ?? []).flat();

  if (isLoadingFeed) {
    return <PageSpinner />;
  }

  return (
    <VStack height="100%">
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingFeed}
            onRefresh={() => {
              refetchFeed();
            }}
            tintColor={config.tokens.colors.light200}
          />
        }
        contentContainerStyle={{
          rowGap: config.tokens.space['2'],
          paddingVertical: config.tokens.space['2'],
        }}
        data={feedItems}
        renderItem={({ item }) => {
          const mangaData = getRelationship<Manga>(item, 'manga');
          if (!mangaData) return <Box height="$4" bgColor="red" />;

          return (
            <MangaUpdateMemo key={item.id} chapter={item} manga={mangaData} />
          );
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextChapters();
          }
        }}
      />
    </VStack>
  );
}
