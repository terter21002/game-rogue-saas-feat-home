import type { TApiResponse, TBroadcast } from '@repo/types';
import apiClient from '@/utils/api-client';

export const getBroadcasts = async (userId: string): Promise<TBroadcast[]> => {
  const res = await apiClient.get(`/broadcast/${userId}`);
  const data = (await res.data) as TApiResponse<TBroadcast[]>;
  return data.data;
};
