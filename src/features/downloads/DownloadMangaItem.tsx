import { memo } from 'react';
import { Box, Image, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';
import { getRelationship } from '@/utils/get-relationship';
import { AuthorRelation } from '@/utils/missing-types';

export type DownloadMangaItemProps = {
  manga: Manga;
};

export function DownloadMangaItem({ manga }: DownloadMangaItemProps) {
  const navigation = useNavigation<FromMain>();
  const author = getRelationship<AuthorRelation>(manga, 'author');

  const mangaTitle = getMangaTitle(manga);
  const mangaCover = getCoverArtUrlFromManga(manga);
  const authorName = author?.attributes.name;

  return (
    <Pressable
      height="$48"
      //4 Columns
      flex={1 / 4}
      onPress={() => {
        navigation.navigate('MangaDetails', {
          mangaId: manga.id!,
          isDownloaded: true,
        });
      }}
    >
      <Image
        source={mangaCover}
        style={{
          height: 140,
          width: '100%',
          alignSelf: 'center',
        }}
        resizeMode="cover"
        alt={mangaTitle}
      />
      <Box paddingVertical="$1">
        <Text
          numberOfLines={2}
          size="xs"
          color={colors.textDark0}
          lineHeight={14}
        >
          {mangaTitle}
        </Text>
        <Text numberOfLines={1} size="2xs" color={colors.textDark400}>
          {authorName}
        </Text>
      </Box>
    </Pressable>
  );
}

const DownloadMangaMemo = memo(DownloadMangaItem);
export default DownloadMangaMemo;
