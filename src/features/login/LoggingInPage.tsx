import { colors } from '@/config/theme';
import { Spinner, View, Text, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//View when is logging in
export default function LoggingInPage() {
  const insets = useSafeAreaInsets();
  return (
    <View
      display='flex'
      justifyContent='center'
      flex={1}
      backgroundColor={colors.bg1}
      paddingTop={insets.top}
    >
      <VStack rowGap='$4'>
        <Spinner size='large' />
        <Text size='lg' textAlign='center'>
          Logging in...
        </Text>
      </VStack>
    </View>
  );
}
