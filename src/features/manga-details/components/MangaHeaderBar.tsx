import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  AlertDialog,
  AlertDialogContent,
  Box,
  Button,
  ButtonText,
  HStack,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { deleteDownloadedManga } from '@/utils/download-calls';
import { getMangaTitle } from '@/utils/get-manga-title';
import { useBoolean } from '@/utils/use-boolean';

export type MangaHeaderBarProps = {
  manga: Manga;
  isDownloaded: boolean;
};

export default function MangaHeaderBar({
  manga,
  isDownloaded,
}: MangaHeaderBarProps) {
  const navigation = useNavigation();
  const mangaTitle = getMangaTitle(manga);

  const {
    value: isDialogOpen,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();

  const { mutateAsync: triggerDeleteManga } = useMutation({
    mutationFn: async () => {
      if (!isDownloaded) return;
      return deleteDownloadedManga(manga.id!);
    },
  });

  return (
    <Box
      width="$full"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="$2"
      height={40}
      backgroundColor={colors.backgroundDark950}
    >
      <Pressable onPress={() => navigation.goBack()}>
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
        color={colors.textDark0}
        width="$64"
        numberOfLines={1}
      >
        {mangaTitle}
      </Text>
      {isDownloaded ? (
        <>
          <Pressable onPress={openDialog}>
            <Ionicons
              style={{ color: colors.error400 }}
              name="trash-outline"
              size={25}
            />
          </Pressable>
          <AlertDialog isOpen={isDialogOpen} onClose={closeDialog}>
            <AlertDialogContent
              backgroundColor="$backgroundDark700"
              padding="$4"
              rowGap="$4"
            >
              <Text color={colors.textDark0} textAlign="center">
                Are you sure you want to delete {mangaTitle}?
              </Text>
              <HStack gap="$4">
                <Button
                  action="negative"
                  flex={1}
                  onPress={async () => {
                    await triggerDeleteManga();
                    closeDialog();
                    navigation.goBack();
                  }}
                >
                  <ButtonText>Yes</ButtonText>
                </Button>
                <Button flex={1} onPress={closeDialog}>
                  <ButtonText>No</ButtonText>
                </Button>
              </HStack>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <Ionicons name="ellipsis-vertical" size={20} color={colors.textDark0} />
      )}
    </Box>
  );
}
