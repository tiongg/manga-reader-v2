import { Button, Text, View } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/config/theme';
import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { clearDownloads } from '@/utils/download-calls';

export default function SettingsPage() {
  const { logout } = useMangadexAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor={colors.backgroundDark950}
      paddingTop={insets.top}
    >
      <Button
        onPress={() => {
          logout();
        }}
        width="$48"
      >
        <Text>Logout</Text>
      </Button>
      <Button
        onPress={() => {
          clearDownloads();
        }}
        width="$48"
      >
        <Text>Clear downloads</Text>
      </Button>
    </View>
  );
}
