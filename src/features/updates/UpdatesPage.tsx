import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { Box, ScrollView, VStack, RefreshControl } from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';
import { Manga, MangaRelation } from 'mangadex-client';
import _ from 'lodash';
import { config } from '@gluestack-ui/config';
import MangaUpdateItem from './MangaUpdateItem';
import { getFeed, getMangas } from '@/utils/queries';
import { getRelationship } from '@/utils/get-relationship';
import PageSpinner from '@/components/PageSpinner';

export default function UpdatesPage() {
  const { user } = useMangadexAuth();
  const {
    data: feed,
    isLoading: isLoadingFeed,
    isRefetching: isRefetchingFeed,
    refetch: refetchFeed,
  } = useQuery({
    queryKey: ['follows'],
    queryFn: () => getFeed(),
    enabled: !!user,
  });

  const feedIds = (feed ?? [])
    .map(chapter => getRelationship<MangaRelation>(chapter, 'manga').id)
    .filter((x): x is string => !!x);

  const { data: mangaData, isLoading: isLoadingManga } = useQuery({
    queryKey: ['manga', feedIds],
    queryFn: () => getMangas(feedIds),
    enabled: !!feedIds.length,
  });

  //Map mangaid to mangadata
  const mangaMap = new Map<string, Manga>(
    (mangaData ?? []).map(manga => [manga.id!, manga])
  );

  return (
    <VStack height='100%'>
      <Box flex={1}>
        {isLoadingFeed || isLoadingManga ? (
          <PageSpinner />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingFeed}
                onRefresh={() => {
                  refetchFeed();
                }}
                tintColor={config.tokens.colors.light200}
              />
            }
          >
            <VStack rowGap='$2' paddingVertical='$2'>
              {feed?.map(chapter => {
                const mangaData = chapter.relationships?.find(
                  r => r.type === 'manga'
                );
                return (
                  <MangaUpdateItem
                    key={chapter.id}
                    chapter={chapter}
                    manga={mangaMap.get(mangaData!.id!)!}
                  />
                );
              })}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </VStack>
  );
}
