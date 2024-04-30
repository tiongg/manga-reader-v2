import { FlatList } from 'react-native';
import { Text, View } from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';

import PageSpinner from '@/components/PageSpinner';
import { theme } from '@/config/theme';
import { getDownloadedMangaQuery } from '@/utils/query-options';
import DownloadMangaMemo from './DownloadMangaItem';

export default function DownloadsPage() {
  const { data: downloadedManga, isPending: isPendingDownloadedManga } =
    useQuery(getDownloadedMangaQuery());

  if (isPendingDownloadedManga) return <PageSpinner />;

  if (!downloadedManga) {
    return <Text>Something is null...</Text>;
  }

  return (
    <View flex={1}>
      <FlatList
        ListHeaderComponent={
          <Text padding="$4">{downloadedManga.length} manga</Text>
        }
        numColumns={4}
        contentContainerStyle={{
          gap: theme.tokens.space['2'],
        }}
        columnWrapperStyle={{
          paddingHorizontal: theme.tokens.space['2'],
          gap: theme.tokens.space['2'],
        }}
        data={downloadedManga}
        renderItem={({ item }) => <DownloadMangaMemo manga={item} />}
        keyExtractor={(item) => item.id!}
      />
    </View>
  );
}
