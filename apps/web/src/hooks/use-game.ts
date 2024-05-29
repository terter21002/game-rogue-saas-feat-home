import type { TApiResponse, TGame } from '@repo/types';
import { type TGameCreate, ZGameCreate } from '@repo/types/game';
import { convertIntoFormData } from '@repo/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/const';
import apiClient from '@/utils/api-client';

export const useGames = () => {
  const queryKey = [QUERY_KEYS.games];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return apiClient
        .get('/game')
        .then((response) => response.data as TApiResponse<TGame[]>)
        .then((data) => data.data);
    },
    enabled: false,
  });
  return query;
};

export const useUpdateGame = () => {
  const mutate = useMutation({
    mutationFn: async ({
      _id,
      data,
      files,
    }: {
      _id?: string;
      data: TGameCreate;
      files?: { image?: File; banner?: File };
    }) => {
      const payload = ZGameCreate.omit({ image: true, banner: true }).parse(data);
      const formData = convertIntoFormData(payload);
      if (files?.image) formData.append('image', files.image);
      if (files?.banner) formData.append('banner', files.banner);
      if (_id) return apiClient.put(`/game/${_id}`, formData);
      return apiClient.post('/game', formData);
    },
  });
  return mutate;
};
