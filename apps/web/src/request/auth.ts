import type { TApiResponse, TUser } from '@repo/types';
import apiClient from '@/utils/api-client';

export const getSelf = async (): Promise<TUser> => {
  const res = await apiClient.get(`/auth/profile`);
  const data = (await res.data) as TApiResponse<TUser>;
  return data.data;
};
