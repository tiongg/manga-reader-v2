import { Dimensions } from 'react-native';
import { Box, Button, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { colors } from '@/config/theme';
import { FromStack } from '@/types/navigation/nav-params';

export type EndOfMangaProps = {
  mangaId: string;
};

/**
 * Shown after the last page, if there is no next chapter
 */
export default function EndOfManga({ mangaId }: EndOfMangaProps) {
  const navigation = useNavigation<FromStack<'MangaReader'>>();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100%',
        width: Dimensions.get('window').width,
      }}
    >
      <Box bgColor={colors.bg3} width="$4/5" height="$2/3" padding="$4">
        <Text fontSize="$lg" color={colors.words1}>
          More by author:
        </Text>
        <Button
          onPress={() => {
            //Navigate instead of goBack
            //since they can come from chapter page/follows page
            navigation.navigate('MangaDetails', { mangaId });
          }}
        >
          <Text>Back to manga</Text>
        </Button>
      </Box>
    </Box>
  );
}
