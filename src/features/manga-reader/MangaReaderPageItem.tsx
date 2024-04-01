import { memo, useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { Box, Image, Spinner } from '@gluestack-ui/themed';

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
        key={url}
        source={url}
        alt={`Page ${index + 1}`}
        resizeMode="contain"
        margin="auto"
        style={{
          height: '100%',
          //Leave 4px gap between pages
          width: Dimensions.get('window').width - 4,
          marginHorizontal: 2,
        }}
        onLoadStart={startLoading}
        onLoadEnd={stopLoading}
      />
    </Pressable>
  );
}

const PageItemMemo = memo(PageItem);
export default PageItemMemo;
