import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { getMangaTitle } from '@/utils/get-manga-title';

export type MangaHeaderBarProps = {
  manga: Manga;
};

export default function MangaHeaderBar({ manga }: MangaHeaderBarProps) {
  const navigation = useNavigation();
  const mangaTitle = getMangaTitle(manga);

  return (
    <Box
      width="$full"
      display="flex"
      alignItems="center"
      padding="$2"
      height={40}
      backgroundColor={colors.backgroundDark950}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        alignSelf="flex-start"
        position="absolute"
        paddingVertical="$2"
        paddingHorizontal="$4"
      >
        <Ionicons
          style={{ color: colors.textDark0 }}
          name="chevron-back-outline"
          size={25}
        />
      </Pressable>
      <Text
        fontSize="$lg"
        fontWeight="bold"
        textAlign="center"
        margin="auto"
        color={colors.textDark0}
        width="$64"
        numberOfLines={1}
      >
        {mangaTitle}
      </Text>
    </Box>
  );
}
