import type { TApiResponse, TStream, TTag, TUser } from '@repo/types';
import apiClient from '@/utils/api-client';

export const getUserById = async (
  id: string
): Promise<TUser & { stream: TStream & { tags: TTag[] }; _count: { followedBy: number } }> => {
  const res = await apiClient.get(`/user/id/${id}`);
  const user = (await res.data) as TApiResponse<
    TUser & { stream: TStream & { tags: TTag[] }; _count: { followedBy: number } }
  >;
  return user.data;
};

export const updateUserByUserId = async (data: Partial<TUser>, userId: string): Promise<TUser> => {
  const res = await apiClient.put(`/user/${userId}`, data);
  const user = (await res.data) as TApiResponse<TUser>;
  return user.data;
};
