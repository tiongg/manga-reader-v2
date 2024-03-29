import { Dimensions } from 'react-native';
import { Box } from '@gluestack-ui/themed';

/**
 * Placed at start/end of list to allow onStartReached/onEndReached to work properly
 */
export default function ChapterEdgeMarker() {
  return (
    <Box
      style={{
        height: '100%',
        width: Dimensions.get('window').width,
      }}
    />
  );
}
