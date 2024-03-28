import { Box } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/config/theme';

export default function TopInset() {
  const inset = useSafeAreaInsets();
  return <Box backgroundColor={colors.bg1} height={inset.top} />;
}
