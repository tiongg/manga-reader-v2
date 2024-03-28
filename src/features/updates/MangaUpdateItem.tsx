import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrl } from '@/utils/cover-art-url';
import { Box, Pressable, Image, Text } from '@gluestack-ui/themed';
import { Chapter, Manga } from 'mangadex-client';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/config/theme';
import { getRelationship } from '@/utils/get-relationship';
import { CoverArtRelation } from '@/utils/missing-types';
import { memo } from 'react';
import { getMangaTitle } from '@/utils/get-manga-title';

export function MangaUpdateItem({
  chapter,
  manga,
}: {
  chapter: Chapter;
  manga: Manga;
}) {
  const coverArtFileName = getRelationship<CoverArtRelation>(manga, 'cover_art')
    .attributes.fileName!;
  const coverArtUrl = getCoverArtUrl(manga.id!, coverArtFileName);
  const mangaTitle = getMangaTitle(manga);
  const chapterAttributes = chapter.attributes!;

  const navigate = useNavigation<FromMain>();

  return (
    <Pressable
      onPress={() => {
        navigate.navigate('MangaDetails', { mangaId: manga.id! });
      }}
    >
      <Box paddingHorizontal='$2' flex={1}>
        <Box gap='$2' display='flex' flexDirection='row'>
          <Image
            source={coverArtUrl}
            alt={`${mangaTitle} cover`}
            resizeMode='cover'
            width={70}
            height={100}
          />
          <Box flex={1}>
            <Text
              fontWeight='$bold'
              color={colors.words1}
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {mangaTitle}
            </Text>
            <Text numberOfLines={1}>
              Chapter {chapterAttributes.chapter}
              {chapterAttributes.title ? ` - ${chapterAttributes.title}` : ''}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}

const MangaUpdateMemo = memo(MangaUpdateItem);
export default MangaUpdateMemo;
