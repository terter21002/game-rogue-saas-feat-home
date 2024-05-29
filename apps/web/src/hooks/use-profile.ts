import { type TApiResponse, type TCountryCode, type TUser, ZApiResponse } from '@repo/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { QUERY_KEYS } from '@/config/const';
import apiClient from '@/utils/api-client';

const useProfile = () => {
  const queryKey = [QUERY_KEYS.profile];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return apiClient
        .get('/auth/profile')
        .then(async (response) => {
          const data = await ZApiResponse.safeParseAsync(response.data);
          if (data.success) {
            return data.data.data as TUser;
          }
          throw new Error(data.error.errors[0].message);
        })
        .catch((error: AxiosError) => {
          throw new Error(
            // @ts-expect-error -- self defined
            (error.response?.data?.message ?? error.message) as string
          );
        });
    },
  });
  return { ...query, queryKey };
};

const useUpdateProfile = () => {
  const queryKey = [QUERY_KEYS.profile];
  const query = useMutation({
    mutationFn: async ({
      name,
      image,
      banner,
      country,
    }: {
      name?: string;
      image?: File;
      banner?: File;
      country?: TCountryCode | null;
    }) => {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (image) formData.append('image', image);
      if (banner) formData.append('banner', banner);
      if (country !== undefined) formData.append('country', country ?? '');
      return apiClient
        .post('/auth/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          return response.data as TApiResponse<TUser>;
        })
        .then((data: TApiResponse<TUser>) => {
          if (data.success) {
            const user = data.data;
            return user;
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

export { useProfile, useUpdateProfile };
