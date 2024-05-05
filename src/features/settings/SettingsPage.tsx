import { ScrollView, View } from '@gluestack-ui/themed';

import { colors } from '@/config/theme';
import SettingsAccountView from './SettingsAccountView';
import SettingsDownloadView from './SettingsDownloadView';

export default function SettingsPage() {
  return (
    <View display="flex" flex={1} backgroundColor={colors.backgroundDark950}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsAccountView />
        <SettingsDownloadView />
      </ScrollView>
    </View>
  );
}
