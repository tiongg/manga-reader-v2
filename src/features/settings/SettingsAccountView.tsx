import { Box, Button, Text, VStack } from '@gluestack-ui/themed';

import { useMangadexAuth } from '@/providers/MangadexAuth.provider';

export default function SettingsAccountView() {
  const { logout } = useMangadexAuth();
  return (
    <Box padding="$2">
      <Text fontSize="$lg">Account</Text>
      <VStack margin="$4">
        <Button
          onPress={() => {
            logout();
          }}
          width="$48"
        >
          <Text>Logout</Text>
        </Button>
      </VStack>
    </Box>
  );
}
