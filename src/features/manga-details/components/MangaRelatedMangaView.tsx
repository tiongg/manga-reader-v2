import { ScrollView } from 'react-native';
import { HStack, Text, VStack } from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { getRecommendations } from '@/utils/service-calls';
import { RelatedMangaItem } from './RelatedMangaItem';

export type MangaRelatedMangaViewProps = {
  manga: Manga;
};

export default function MangaRelatedMangaView({
  manga,
}: MangaRelatedMangaViewProps) {
  const aniListId = parseInt(manga.attributes?.links?.al ?? '0');

  const { data: relatedMangas, isFetching } = useQuery({
    queryKey: ['relatedManga', manga.id],
    queryFn: () => getRecommendations(aniListId),
    //Not linked to MangaUpdates
    //TODO: Consider querying by title instead
    enabled: !!manga.id && !!aniListId,
    //Cache for 24 hours
    //Recs aint changing that much
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isFetching) {
    return null;
  }

  if (!relatedMangas || relatedMangas.length === 0) {
    return null;
  }

  return (
    <VStack backgroundColor={colors.backgroundDark900} rowGap="$2" padding="$4">
      <Text color={colors.textDark0} fontWeight="600" fontSize="$lg">
        Recommended
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack gap="$2" flex={1}>
          {relatedMangas.map((manga, i) => (
            <RelatedMangaItem key={i} manga={manga} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
}
