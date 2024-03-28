import { Box, Text } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FadeInView from '@/components/FadeInView';
import { colors } from '@/config/theme';

export type MangaReaderBottomOverlayProps = {
  currentPage: number;
  totalPages: number;
};

export default function MangaReaderBottomOverlay({
  currentPage,
  totalPages,
}: MangaReaderBottomOverlayProps) {
  const inset = useSafeAreaInsets();

  return (
    <FadeInView
      style={{
        position: 'absolute',
        width: '100%',
        height: 30 + inset.bottom,
        bottom: 0,
        backgroundColor: colors.bg2,
      }}
    >
      <Text color={colors.words1} textAlign="center" paddingTop="$3">
        {currentPage + 1} / {totalPages}
      </Text>
      <Box height={inset.bottom} />
    </FadeInView>
  );
}
