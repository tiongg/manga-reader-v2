import { colors } from '@/config/theme';
import { FromMain } from '@/types/navigation/nav-params';
import { Pressable, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Chapter, Manga } from 'mangadex-client';

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
  const { volume, title, chapter: chapterNumber } = chapter.attributes!;
  const text = `${volume ? `Vol. ${volume}, ` : ''}Chapter ${chapterNumber}${
    title ? ` - ${title}` : ''
  }`;
  const navigation = useNavigation<FromMain>();

  return (
    <Pressable
      paddingHorizontal='$4'
      paddingVertical='$3.5'
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
