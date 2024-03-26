import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Manga } from 'mangadex-client';
import { getMangaTitle } from '@/utils/get-manga-title';
import { colors } from '@/config/theme';

export type MangaHeaderBarProps = {
  manga: Manga;
};

export default function MangaHeaderBar({ manga }: MangaHeaderBarProps) {
  const navigation = useNavigation();
  const mangaTitle = getMangaTitle(manga);

  return (
    <Box
      width='$full'
      display='flex'
      alignItems='center'
      padding='$2'
      height={40}
      backgroundColor={colors.bg1}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        alignSelf='flex-start'
        position='absolute'
        paddingVertical='$2'
        paddingHorizontal='$4'
      >
        <Ionicons
          style={{ color: colors.words1 }}
          name='chevron-back-outline'
          size={25}
        />
      </Pressable>
      <Text
        fontSize='$lg'
        fontWeight='bold'
        textAlign='center'
        margin='auto'
        color={colors.words1}
        width='$64'
        numberOfLines={1}
      >
        {mangaTitle}
      </Text>
    </Box>
  );
}
