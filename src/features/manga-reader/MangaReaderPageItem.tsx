import { memo } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { Center, Spinner } from '@gluestack-ui/themed';
import { Image } from 'expo-image';

import { colors } from '@/config/theme';
import { useBoolean } from '@/utils/use-boolean';

export type PageProps = {
  url: string;
  index: number;
  onPress: () => void;
};

/**
 * Individual page for reader
 */
export function PageItem({ url, index, onPress }: PageProps) {
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: stopLoading,
  } = useBoolean(true);

  return (
    <Pressable onPress={onPress}>
      {isLoading && (
        <Center height="$full" width="$full">
          <Spinner color={colors.light100} />
        </Center>
      )}
      <Image
        recyclingKey={url}
        source={url}
        alt={`Page ${index + 1}`}
        contentFit="contain"
        style={{
          margin: 'auto',
          height: '100%',
          width: Dimensions.get('window').width,
        }}
        cachePolicy="none"
        // cachePolicy="memory-disk"  //Casues memory leak
        onLoadStart={startLoading}
        onLoadEnd={stopLoading}
      />
    </Pressable>
  );
}

const PageItemMemo = memo(PageItem);
export default PageItemMemo;
