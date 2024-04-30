import { memo } from 'react';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
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
        navigate.navigate('MangaDetails', {
          mangaId: manga.id!,
          isDownloaded: false,
        });
      }}
      paddingHorizontal="$4"
      flex={1}
    >
      <Box gap="$3" display="flex" flexDirection="row">
        <Image
          source={coverArtUrl}
          alt={`${mangaTitle} cover`}
          contentFit="cover"
          style={{
            width: 70,
            height: 100,
          }}
          cachePolicy="memory-disk"
        />
        <Box flex={1}>
          <Text color={colors.textDark0} numberOfLines={2}>
            {mangaTitle}
          </Text>
          <Text numberOfLines={1} color={colors.textDark400} fontSize="$sm">
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
