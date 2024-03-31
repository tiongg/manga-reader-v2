import { PropsWithChildren } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/config/query-client';
import { colors, theme } from '@/config/theme';
import { MangadexAuthProvider } from '@/providers/MangadexAuth.provider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <MangadexAuthProvider>
        <GluestackUIProvider config={theme} colorMode="dark">
          <SafeAreaProvider>
            <StatusBar style="light" />
            <NavigationContainer
              theme={{
                dark: true,
                colors: {
                  border: colors.backgroundDark900,
                  background: colors.backgroundDark900,
                  card: colors.backgroundDark950,
                  primary: colors.btn,
                  text: colors.textDark0,
                  notification: colors.red600,
                },
              }}
            >
              {children}
            </NavigationContainer>
          </SafeAreaProvider>
        </GluestackUIProvider>
      </MangadexAuthProvider>
    </QueryClientProvider>
  );
}
