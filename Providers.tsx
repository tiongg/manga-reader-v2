import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { MangadexAuthProvider } from '@/providers/MangadexAuth.provider';
import { colors, theme } from '@/config/theme';
import { queryClient } from '@/config/query-client';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <MangadexAuthProvider>
        <GluestackUIProvider config={theme} colorMode='dark'>
          <SafeAreaProvider>
            <StatusBar style='light' />
            <NavigationContainer
              theme={{
                dark: true,
                colors: {
                  border: colors.bg2,
                  background: colors.bg2,
                  card: colors.bg1,
                  primary: colors.btn,
                  text: colors.words1,
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
