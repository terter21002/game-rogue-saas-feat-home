'use server';

import type { TFollow, TUser } from '@repo/types';
import { revalidatePath } from 'next/cache';
import { followUser, unfollowUser } from '@/request/follow';

export const onFollow = async (
  id: string
): Promise<TFollow & { following: TUser; followedBy: TUser }> => {
  const followedUser = await followUser(id);

  revalidatePath('/');

  if (followedUser.following._id) {
    revalidatePath(`/tv/stream/${followedUser.following._id}`);
  }

  return followedUser;
};

export const onUnfollow = async (id: string): Promise<TFollow & { following: TUser }> => {
  const unfollowedUser = await unfollowUser(id);

  revalidatePath(`/`);

  if (unfollowedUser.following._id) {
    revalidatePath(`/tv/stream/${unfollowedUser.following._id}`);
  }

  return unfollowedUser;
};
