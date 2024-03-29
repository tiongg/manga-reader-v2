import { memo } from 'react';
import { Box, Image, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';

export function MangaUpdateItem({
  chapter,
  manga,
}: {
  chapter: Chapter;
  manga: Manga;
}) {
  const coverArtUrl = getCoverArtUrlFromManga(manga);
  const mangaTitle = getMangaTitle(manga);
  const chapterAttributes = chapter.attributes!;

  const navigate = useNavigation<FromMain>();

  return (
    <Pressable
      onPress={() => {
        navigate.navigate('MangaDetails', { mangaId: manga.id! });
      }}
      paddingHorizontal="$2"
      flex={1}
    >
      <Box gap="$2" display="flex" flexDirection="row">
        <Image
          source={coverArtUrl}
          alt={`${mangaTitle} cover`}
          resizeMode="cover"
          width={70}
          height={100}
        />
        <Box flex={1}>
          <Text
            fontWeight="$bold"
            color={colors.words1}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {mangaTitle}
          </Text>
          <Text numberOfLines={1}>
            Chapter {chapterAttributes.chapter}
            {chapterAttributes.title ? ` - ${chapterAttributes.title}` : ''}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

const MangaUpdateMemo = memo(MangaUpdateItem);
export default MangaUpdateMemo;
