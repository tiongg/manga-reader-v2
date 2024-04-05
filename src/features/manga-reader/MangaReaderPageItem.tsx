import { memo, useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { Box, Spinner } from '@gluestack-ui/themed';
import { Image } from 'expo-image';

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
        <Box
          height="$full"
          width="$full"
          position="absolute"
          justifyContent="center"
        >
          <Spinner color="$amber.100" />
        </Box>
      )}
      <Image
        recyclingKey={url}
        source={url}
        alt={`Page ${index + 1}`}
        contentFit="contain"
        style={{
          height: '100%',
          width: Dimensions.get('window').width,
          margin: 'auto',
        }}
        cachePolicy="memory-disk"
        onLoadStart={startLoading}
        onLoadEnd={stopLoading}
      />
    </Pressable>
  );
}

const PageItemMemo = memo(PageItem);
export default PageItemMemo;
