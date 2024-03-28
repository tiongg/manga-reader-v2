import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Box,
  Image,
  Pressable,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { capitalize } from 'lodash';
import { Chapter, Manga } from 'mangadex-client';
import { match } from 'ts-pattern';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';
import { getRelationship } from '@/utils/get-relationship';
import { AuthorRelation } from '@/utils/missing-types';

export type MangaDetailViewProps = {
  manga: Manga;
  chapters: Chapter[];
  lastReadChapter?: Chapter;
};

export default function MangaDetailView({
  manga,
  chapters,
  lastReadChapter,
}: MangaDetailViewProps) {
  const navigation = useNavigation<FromMain>();

  const imageUrl = getCoverArtUrlFromManga(manga);
  const status = manga.attributes?.status;
  const mangaTitle = getMangaTitle(manga);
  const author = getRelationship<AuthorRelation>(manga, 'author');
  const numChapters = chapters.length;

  //Resume button stuff
  const indexOfLastRead = chapters.findIndex(
    (x) => x.id === lastReadChapter?.id
  );
  const nextChapterIndex = match(indexOfLastRead - 1)
    //No last read OR last read is the last chapter
    //Start from the beginning
    .when(
      (x) => x < 0,
      () => numChapters - 1
    )
    //Ngl this shouldn't happen but just in case
    .when(
      (x) => x >= numChapters,
      () => numChapters - 1
    )
    .otherwise((x) => x);
  const nextChapterId = chapters[nextChapterIndex]?.id;

  return (
    <VStack rowGap="$3" backgroundColor={colors.bg2}>
      <Box width="$full" marginTop="$3" display="flex" alignItems="center">
        <Image
          style={{ height: 180, width: '100%' }}
          resizeMode="contain"
          source={imageUrl}
          alt="cover art"
        />
      </Box>
      <Text
        textAlign="center"
        fontSize="$xl"
        fontWeight="bold"
        marginHorizontal="$3"
        color={colors.words1}
      >
        {mangaTitle}
      </Text>
      <Text textAlign="center" fontSize="$sm" color={colors.words2}>
        {author.attributes.name} • {capitalize(status)}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: 15,
        }}
      >
        <Pressable
          onPress={() => {
            if (!nextChapterId) return;
            navigation.navigate('MangaReader', {
              chapterId: nextChapterId!,
              mangaId: manga.id!,
            });
          }}
        >
          <Ionicons
            style={{ textAlign: 'center' }}
            color={colors.btn}
            name="play-outline"
            size={30}
            disabled={!nextChapterId}
          />
          <Text textAlign="center">{lastReadChapter ? 'Resume' : 'Read'}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('ChapterSelect', { mangaId: manga.id! });
          }}
        >
          <Ionicons
            style={{ textAlign: 'center' }}
            color={colors.btn}
            name="list-outline"
            size={30}
          />
          <Text textAlign="center">{numChapters} Chapters</Text>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Ionicons
            style={{ textAlign: 'center' }}
            color={colors.btn}
            name="heart"
            size={30}
          />
          <Text textAlign="center">Following</Text>
        </Pressable>
      </View>
    </VStack>
  );
}
