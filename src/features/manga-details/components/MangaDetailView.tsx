import React, { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Box,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { capitalize } from 'lodash';
import { Chapter, Manga } from 'mangadex-client';
import { match } from 'ts-pattern';

import { colors, theme } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getCoverArtUrlFromManga } from '@/utils/cover-art-url';
import { getMangaTitle } from '@/utils/get-manga-title';
import { getRelationship } from '@/utils/get-relationship';
import { AuthorRelation } from '@/utils/missing-types';
import {
  getFollowMangaMutation,
  getUnfollowMangaMutation,
} from '@/utils/query-options';
import { useBoolean } from '@/utils/use-boolean';

export type MangaDetailViewProps = {
  manga: Manga;
  chapters: Chapter[];
  lastReadChapter?: Chapter;
  isDownloaded: boolean;
  isFollowing: boolean;
};

function ActionIcon({ ...props }: ComponentProps<typeof Ionicons>) {
  return (
    <Ionicons
      style={{ textAlign: 'center' }}
      color={colors.btn}
      size={theme.tokens.fontSizes['4xl']}
      {...props}
    />
  );
}

export default function MangaDetailView({
  manga,
  chapters,
  lastReadChapter,
  isDownloaded,
  isFollowing: isFollowingInital,
}: MangaDetailViewProps) {
  const navigation = useNavigation<FromMain>();

  const { value: isFollowing, toggle: toggleFollowing } =
    useBoolean(isFollowingInital);
  const { mutate: followManga, isPending: isFollowingMutation } = useMutation(
    getFollowMangaMutation(manga.id!)
  );
  const { mutate: unfollowManga, isPending: isUnfollowingMutation } =
    useMutation(getUnfollowMangaMutation(manga.id!));

  const imageUrl = getCoverArtUrlFromManga(manga);
  const status = manga.attributes?.status;
  const mangaTitle = getMangaTitle(manga);
  const author = getRelationship<AuthorRelation>(manga, 'author');
  const numChapters = chapters.length;
  const isMutatingFollow = isFollowingMutation || isUnfollowingMutation;

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
    <VStack rowGap="$2" backgroundColor={colors.backgroundDark900}>
      <Box width="$full" marginTop="$3" display="flex" alignItems="center">
        <Image
          style={{ height: 180, width: '100%' }}
          contentFit="contain"
          source={imageUrl}
          alt="cover art"
          cachePolicy="memory-disk"
        />
      </Box>
      <Text
        textAlign="center"
        fontSize="$xl"
        fontWeight="bold"
        marginHorizontal="$3"
        paddingHorizontal="$3"
        color={colors.textDark0}
      >
        {mangaTitle}
      </Text>
      <Text textAlign="center" fontSize="$sm" color={colors.textDark400}>
        {author.attributes.name} • {capitalize(status)}
      </Text>
      <HStack alignItems="center" flex={1} paddingBottom="$4" paddingTop="$2">
        <Pressable
          flex={1}
          disabled={!nextChapterId}
          onPress={() => {
            if (!nextChapterId) return;
            navigation.navigate('MangaReader', {
              chapterId: nextChapterId!,
              mangaId: manga.id!,
              isDownloaded,
            });
          }}
        >
          <ActionIcon name="play-outline" />
          <Text textAlign="center" fontSize="$sm">
            {lastReadChapter ? 'Resume' : 'Read'}
          </Text>
        </Pressable>
        <Divider orientation="vertical" bgColor="$backgroundDark600" />
        <Pressable
          flex={1}
          onPress={() => {
            navigation.navigate('ChapterSelect', {
              mangaId: manga.id!,
              isDownloaded,
            });
          }}
        >
          <ActionIcon name="list-outline" />
          <Text textAlign="center" fontSize="$sm">
            {numChapters} Chapters
          </Text>
        </Pressable>
        <Divider orientation="vertical" bgColor="$backgroundDark600" />
        <Pressable
          flex={1}
          onPress={() => {
            if (isFollowing) {
              unfollowManga();
            } else {
              followManga();
            }
            toggleFollowing();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          disabled={isMutatingFollow}
        >
          <ActionIcon name={isFollowing ? 'heart' : 'heart-outline'} />
          <Text textAlign="center" fontSize="$sm">
            {isFollowing ? 'Favourited' : 'Favourite'}
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
}
