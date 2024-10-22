import { useRef } from 'react';
import { FlatList } from 'react-native';
import { RefreshControl, Text, View } from '@gluestack-ui/themed';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import PageSpinner from '@/components/PageSpinner';
import { colors, theme } from '@/config/theme';
import { getAllFollowsQuery } from '@/utils/query-options';
import { getMangas, LIMIT } from '@/utils/service-calls';
import FollowMangaMemo from './FollowMangaItem';

/**
 * Also called Favourites page
 */
export default function FollowsPage() {
  const { data: allFollows, isPending: isPendingAllFollows } =
    useQuery(getAllFollowsQuery());

  const mangaQueryOffset = useRef(0);
  const followMangaIds = Object.keys(allFollows ?? {});

  const {
    data: followedManga,
    isPending: isPendingFollowedManga,
    fetchNextPage: loadMoreManga,
    hasNextPage: hasMoreManga,
    refetch: refetchMangaData,
    isRefetching: isRefetchingManga,
  } = useInfiniteQuery({
    queryKey: ['follows-manga-data'],
    queryFn: ({ pageParam }) => {
      const toQuery = followMangaIds.slice(mangaQueryOffset.current, pageParam);
      mangaQueryOffset.current = pageParam;
      return getMangas(toQuery);
    },
    initialPageParam: LIMIT,
    getNextPageParam: () =>
      match(mangaQueryOffset.current)
        .when(
          (offset) => offset < followMangaIds.length,
          (offset) => offset + LIMIT
        )
        .otherwise(() => null),
    enabled: followMangaIds.length > 0,
  });

  const refetchManga = () => {
    mangaQueryOffset.current = 0;
    return refetchMangaData();
  };

  if (isPendingAllFollows || isPendingFollowedManga) return <PageSpinner />;

  if (!followedManga) {
    return <Text>Something is null...</Text>;
  }

  return (
    <View flex={1}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingManga}
            onRefresh={() => {
              refetchManga();
            }}
            tintColor={colors.white}
          />
        }
        ListHeaderComponent={
          <Text padding="$4">{followMangaIds.length} manga</Text>
        }
        numColumns={4}
        contentContainerStyle={{
          gap: theme.tokens.space['2'],
        }}
        columnWrapperStyle={{
          paddingHorizontal: theme.tokens.space['2'],
          gap: theme.tokens.space['2'],
        }}
        data={followedManga.pages.map((page) => page.data ?? []).flat()}
        renderItem={({ item }) => <FollowMangaMemo manga={item} />}
        keyExtractor={(item) => item.id!}
        onEndReached={() => {
          if (hasMoreManga) {
            loadMoreManga();
          }
        }}
      />
    </View>
  );
}
