import { Box, Text } from '@gluestack-ui/themed';

import { colors } from '@/config/theme';
import { localeOrFirst } from '@/utils/locale-or-first';
import { TagRelation } from '@/utils/missing-types';

export type TagDisplayProps = {
  tag: TagRelation;
};

export default function TagDisplay({ tag }: TagDisplayProps) {
  const tagNames = tag.attributes.name!;
  const localizedTagName = localeOrFirst(tagNames);

  return (
    <Box backgroundColor={colors.bg4} borderRadius="$md">
      <Text color={colors.words1} padding="$2" fontSize="$sm">
        {localizedTagName}
      </Text>
    </Box>
  );
}
