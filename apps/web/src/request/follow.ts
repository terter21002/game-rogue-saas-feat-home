import type { TApiResponse, TFollow, TUser } from '@repo/types';
import apiClient from '@/utils/api-client';

export const isFollowingUser = async (id: string): Promise<boolean> => {
  const res = await apiClient.get(`/user/follows/${id}`);
  const data = (await res.data) as TApiResponse<{ value: boolean }>;
  return data.data.value;
};

export const followUser = async (
  id: string
): Promise<TFollow & { following: TUser; followedBy: TUser }> => {
  const res = await apiClient.post(`/user/follow`, {
    id,
  });
  const data = (await res.data) as TApiResponse<TFollow & { following: TUser; followedBy: TUser }>;
  return data.data;
};

export const unfollowUser = async (id: string): Promise<TFollow & { following: TUser }> => {
  const res = await apiClient.post(`/user/unfollow`, {
    id,
  });
  const data = (await res.data) as TApiResponse<TFollow & { following: TUser }>;
  return data.data;
};

export const getFollowedUsers = async (): Promise<
  (TFollow & {
    following: TUser & {
      stream: { isLive: boolean } | null;
    };
  })[]
> => {
  const res = await apiClient.get(`/user/follow`);
  const data = (await res.data) as TApiResponse<
    (TFollow & {
      following: TUser & {
        stream: { isLive: boolean } | null;
      };
    })[]
  >;
  return data.data;
};
