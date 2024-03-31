import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';
import { getRelationship } from '@/utils/get-relationship';
import { AuthorRelation } from '@/utils/missing-types';
import { getAuthorMangasQuery } from '@/utils/query-options';

export type MangaAuthorDetailProps = {
  manga: Manga;
};

function RelatedMangaItem({ manga }: { manga: Manga }) {
  const navigation = useNavigation<FromMain>();
  const imageUrl = getCoverArtUrlFromManga(manga);
  const mangaTitle = getMangaTitle(manga);

  return (
    <Pressable
      width="$24"
      onPress={() => {
        navigation.push('MangaDetails', { mangaId: manga.id! });
      }}
    >
      <Image
        source={imageUrl}
        alt={mangaTitle}
        style={{
          width: '100%',
          height: 140,
        }}
        resizeMode="contain"
      />
      <Text color={colors.textDark0} fontSize="$xs" numberOfLines={2}>
        {mangaTitle}
      </Text>
    </Pressable>
  );
}

/**
 * More by author section. Author is taken from manga prop
 */
export default function MangaAuthorDetail({ manga }: MangaAuthorDetailProps) {
  const author = getRelationship<AuthorRelation>(manga, 'author');

  const { data: authorMangas, isLoading: isLoadingAuthorMangas } = useQuery(
    getAuthorMangasQuery(author.id!)
  );

  if (isLoadingAuthorMangas) {
    return <Spinner />;
  }

  if (!authorMangas) {
    return <Text>Error, something is null...</Text>;
  }

  //No other mangas by author
  //Single item is current selected manga
  if (authorMangas.length <= 1) {
    return null;
  }

  //Don't show current manga in the list
  const mangasToShow = authorMangas.filter(
    (authorManga) => authorManga.id !== manga.id
  );

  return (
    <VStack backgroundColor={colors.backgroundDark900} rowGap="$2" padding="$4">
      <Text color={colors.textDark0} fontWeight="600" fontSize="$lg">
        More by author
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack gap="$2" flex={1}>
          {mangasToShow.map((manga, i) => (
            <RelatedMangaItem key={i} manga={manga} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
}
