import { Spinner, View } from '@gluestack-ui/themed';

import { colors } from '@/config/theme';
import TopInset from './TopInset';

export type PageSpinnerProps = {
  insetTop?: boolean;
  bgColor?: string;
};

export default function PageSpinner({
  insetTop = false,
  bgColor = colors.backgroundDark900,
}: PageSpinnerProps) {
  return (
    <>
      {insetTop && <TopInset />}
      <View
        display="flex"
        justifyContent="center"
        flex={1}
        backgroundColor={bgColor}
      >
        <Spinner />
      </View>
    </>
  );
}
