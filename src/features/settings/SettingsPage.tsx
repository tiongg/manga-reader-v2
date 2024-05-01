import { Button, Text, View } from '@gluestack-ui/themed';
import { useMutation } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { queryClient } from '@/config/query-client';
import { colors } from '@/config/theme';
import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { clearDownloads } from '@/utils/download-calls';

export default function SettingsPage() {
  const { logout } = useMangadexAuth();
  const insets = useSafeAreaInsets();

  const { mutateAsync: triggerClearDownloads } = useMutation({
    mutationFn: async () => clearDownloads(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['downloaded-manga'],
      });
    },
  });

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
          triggerClearDownloads();
        }}
        width="$48"
      >
        <Text>Clear downloads</Text>
      </Button>
    </View>
  );
}
