import { followUser, getFollowedUsers, isFollowingUser, unfollowUser } from '@/services/follow';
import { getUserById, updateUser } from '@/services/user';
import { TApiResponse, TFollow, TStream, TUser } from '@repo/types';
import type { Request, Response } from 'express';

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  return res.json({
    data: user,
    success: true,
    message: 'success',
  } as TApiResponse<TUser & { stream: TStream; _count: { followedBy: number } }>);
};

export const checkUserFollowsController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const id = req.params.id;
  const isFollows = await isFollowingUser(id, userId);
  return res.json({
    data: { value: isFollows },
    success: true,
    message: 'success',
  } as TApiResponse<{ value: boolean }>);
};

export const userFollowController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const id = req.body.id;
  const data = await followUser(id, userId);
  return res.json({
    data,
    success: true,
    message: 'success',
  } as TApiResponse<TFollow & { following: TUser; followedBy: TUser }>);
};

export const userFollowListController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const data = await getFollowedUsers(userId);
  return res.json({
    data,
    success: true,
    message: 'success',
  } as TApiResponse<
    (TFollow & {
      following: TUser & {
        stream: { isLive: boolean } | null;
      };
    })[]
  >);
};

export const userUnFollowController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const id = req.body.id;
  const data = await unfollowUser(id, userId);
  return res.json({
    data,
    success: true,
    message: 'success',
  } as TApiResponse<TFollow & { following: TUser }>);
};

export const updateUserController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const data = req.body;
  const resData = await updateUser(data, userId);
  return res.json({
    data: resData,
    success: true,
    message: 'success',
  } as TApiResponse<TUser>);
};
