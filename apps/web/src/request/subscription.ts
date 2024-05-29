import type { TApiResponse } from '@repo/types';
import apiClient from '@/utils/api-client';

export const createSubscription = async (id: string): Promise<string> => {
  const res = await apiClient.post(`/subscription`, {
    id,
  });
  const data = (await res.data) as TApiResponse<{ client_secret: string }>;
  return data.data.client_secret;
};

export const isSubcribedUser = async (id: string): Promise<boolean> => {
  const res = await apiClient.get(`/subscription/${id}`);
  const data = (await res.data) as TApiResponse<{ value: boolean }>;
  return data.data.value;
};
