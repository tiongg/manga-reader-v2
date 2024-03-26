import { colors } from '@/config/theme';
import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { Button, View, Text } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsPage() {
  const { logout } = useMangadexAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      display='flex'
      justifyContent='center'
      alignItems='center'
      flex={1}
      backgroundColor={colors.bg1}
      paddingTop={insets.top}
    >
      <Button
        onPress={() => {
          logout();
        }}
        width='$48'
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
