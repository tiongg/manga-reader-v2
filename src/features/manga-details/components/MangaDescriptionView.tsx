import { HStack, Text, VStack } from '@gluestack-ui/themed';
import { Manga } from 'mangadex-client';

import TagDisplay from '@/components/TagDisplay';
import { colors } from '@/config/theme';
import { localeOrFirst } from '@/utils/locale-or-first';
import { TagRelation } from '@/utils/missing-types';

export type MangaDescriptionViewProps = {
  manga: Manga;
};

export default function MangaDescriptionView({
  manga,
}: MangaDescriptionViewProps) {
  const tags = manga.attributes?.tags?.filter(
    (x) => x.type === 'tag'
  ) as TagRelation[];
  const descriptions = manga.attributes?.description!;
  const localizedDescription =
    localeOrFirst(descriptions) || 'No description given';

  return (
    <VStack backgroundColor={colors.backgroundDark900} rowGap="$6" padding="$4">
      <VStack rowGap="$2">
        <Text color={colors.textDark0} fontWeight="600" fontSize="$lg">
          Genres
        </Text>
        <HStack flexWrap="wrap" gap="$1.5">
          {tags.map((x, i) => (
            <TagDisplay tag={x} key={`tags-${i}`} />
          ))}
        </HStack>
      </VStack>
      <VStack rowGap="$2">
        <Text color={colors.textDark0} fontWeight="600" fontSize="$lg">
          Description
        </Text>
        <Text color={colors.textDark400} lineHeight="$md">
          {localizedDescription}
        </Text>
      </VStack>
    </VStack>
  );
}
