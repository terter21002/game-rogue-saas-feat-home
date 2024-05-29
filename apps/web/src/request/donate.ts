import type { TApiResponse } from '@repo/types';
import apiClient from '@/utils/api-client';

export const createDonation = async (amount: number) => {
  const res = await apiClient.post(`/donate`, {
    amount,
  });
  const data = (await res.data) as TApiResponse<{ client_secret: string }>;
  return data.data.client_secret;
};
