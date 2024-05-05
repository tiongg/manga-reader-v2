import { memo } from 'react';
import { Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';

import { FromMain } from '@/types/navigation/nav-params';
import { getChapterTitle } from '@/utils/get-chapter-title';

export type ChapterSelectItemProps = {
  chapter: Chapter;
  manga: Manga;
  isRead: boolean;
  isDownloaded: boolean;
};

export function ChapterSelectItem({
  chapter,
  manga,
  isRead,
  isDownloaded,
}: ChapterSelectItemProps) {
  const text = getChapterTitle(chapter);
  const navigation = useNavigation<FromMain>();

  return (
    <Pressable
      paddingHorizontal="$4"
      paddingVertical="$3.5"
      borderBottomColor="$borderDark700"
      borderBottomWidth={1}
      onPress={() => {
        navigation.navigate('MangaReader', {
          mangaId: manga.id!,
          chapterId: chapter.id!,
          isDownloaded,
        });
      }}
    >
      <Text numberOfLines={1} color={isRead ? '$textDark500' : '$textDark100'}>
        {text}
      </Text>
    </Pressable>
  );
}

const ChapterSelectItemMemo = memo(ChapterSelectItem);
export default ChapterSelectItemMemo;
