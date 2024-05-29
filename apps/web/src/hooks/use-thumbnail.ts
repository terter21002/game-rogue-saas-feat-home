import { type TApiResponse, TStream } from '@repo/types';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiClient from '@/utils/api-client';

const useUpdateThumbnail = () => {
  const queryKey = ['thumbnail'];
  const query = useMutation({
    mutationFn: async ({ thumbnail }: { thumbnail: File | null }) => {
      const formData = new FormData();
      if (thumbnail) formData.append('thumbnail', thumbnail);
      return apiClient
        .post('/stream/thumbnail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          return response.data as TApiResponse<TStream>;
        })
        .then((data: TApiResponse<TStream>) => {
          if (data.success) {
            const stream = data.data;
            return stream;
          }
          throw new Error(data.message ?? 'Error');
        })
        .catch((error: AxiosError) => {
          throw new Error(
            // @ts-expect-error self defined
            (error.response?.data?.message ?? error.message) as string
          );
        });
    },
  });
  return { ...query, queryKey };
};
const useDeleteThumbnail = () => {
  const queryKey = ['thumbnail'];
  const query = useMutation({
    mutationFn: async ({ thumbnailUrl: _ }: { thumbnailUrl: string | null }) => {
      return apiClient
        .delete('/stream/thumbnail')
        .then((response) => {
          return response.data as TApiResponse<TStream>;
        })
        .then((data: TApiResponse<TStream>) => {
          if (data.success) {
            const stream = data.data;
            return stream;
          }
          throw new Error(data.message ?? 'Error');
        })
        .catch((error: AxiosError) => {
          throw new Error(
            // @ts-expect-error self defined
            (error.response?.data?.message ?? error.message) as string
          );
        });
    },
  });
  return { ...query, queryKey };
};

export { useUpdateThumbnail, useDeleteThumbnail };
