import { Image, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';

export function RelatedMangaItem({ manga }: { manga: Manga }) {
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
