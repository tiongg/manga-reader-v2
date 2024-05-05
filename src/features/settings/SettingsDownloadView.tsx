import { Box, Button, Text, VStack } from '@gluestack-ui/themed';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/config/query-client';
import { clearDownloads, getDownloadFolderSize } from '@/utils/download-calls';

export default function SettingsDownloadView() {
  const { mutateAsync: triggerClearDownloads } = useMutation({
    mutationFn: async () => clearDownloads(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['downloaded-manga'],
      });
    },
  });
  const { data: downloadsSize, isLoading: isLoadingDownloadsSize } = useQuery({
    queryKey: ['downloaded-manga-size'],
    queryFn: () => getDownloadFolderSize(),
  });

  return (
    <Box padding="$2">
      <Text fontSize="$lg">Downloads</Text>
      <VStack margin="$4">
        <Button
          onPress={() => {
            triggerClearDownloads();
          }}
          width="$48"
        >
          <Text>Delete all downloads</Text>
        </Button>
        <Text>
          {isLoadingDownloadsSize
            ? 'Calculating download size...'
            : `Download size: ${bytesToSize(downloadsSize ?? 0)}`}
        </Text>
      </VStack>
    </Box>
  );
}

function bytesToSize(size: number) {
  if (size === 0) return '0 B';
  const postfixes = ['B', 'kB', 'MB', 'GB', 'TB'];
  const index = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, index)).toFixed(2)} ${postfixes[index]}`;
}
