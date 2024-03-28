import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { VStack, RefreshControl } from '@gluestack-ui/themed';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Manga } from 'mangadex-client';
import _ from 'lodash';
import { config } from '@gluestack-ui/config';
import { getFeedWithManga } from '@/utils/queries';
import { getRelationship } from '@/utils/get-relationship';
import PageSpinner from '@/components/PageSpinner';
import { FlatList } from 'react-native';
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
    queryKey: ['follows'],
    queryFn: ({ pageParam }) => getFeedWithManga(pageParam),
    enabled: !!user,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.offset! + lastPage.limit!,
  });

  const feedItems = (feed?.pages ?? []).map(page => page.data ?? []).flat();

  if (isLoadingFeed) {
    return <PageSpinner />;
  }

  return (
    <VStack height='100%'>
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
          return (
            <MangaUpdateMemo key={item.id} chapter={item} manga={mangaData!} />
          );
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextChapters();
        }}
      />
    </VStack>
  );
}
