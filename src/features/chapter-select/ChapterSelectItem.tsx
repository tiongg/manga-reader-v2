import { Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';

import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { getChapterTitle } from '@/utils/get-chapter-title';

export type ChapterSelectItemProps = {
  chapter: Chapter;
  manga: Manga;
  isRead: boolean;
};

export default function ChapterSelectItem({
  chapter,
  manga,
  isRead,
}: ChapterSelectItemProps) {
  const text = getChapterTitle(chapter);
  const navigation = useNavigation<FromMain>();

  return (
    <Pressable
      paddingHorizontal="$4"
      paddingVertical="$3.5"
      borderBottomColor={colors.bg5}
      borderBottomWidth={1}
      onPress={() => {
        navigation.navigate('MangaReader', {
          mangaId: manga.id!,
          chapterId: chapter.id!,
        });
      }}
    >
      <Text numberOfLines={1} color={isRead ? '$textDark500' : '$textDark100'}>
        {text}
      </Text>
    </Pressable>
  );
}
