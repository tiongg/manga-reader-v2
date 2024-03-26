import { Spinner, View } from '@gluestack-ui/themed';
import TopInset from './TopInset';
import { colors } from '@/config/theme';

export type PageSpinnerProps = {
  insetTop?: boolean;
  bgColor?: string;
};

export default function PageSpinner({
  insetTop = false,
  bgColor = colors.bg2,
}: PageSpinnerProps) {
  return (
    <>
      {insetTop && <TopInset />}
      <View
        display='flex'
        justifyContent='center'
        flex={1}
        backgroundColor={bgColor}
      >
        <Spinner />
      </View>
    </>
  );
}
