import followModel from '@/models/follow';
import userModel from '@/models/user';
import { TStream, TUser } from '@repo/types';

export const isFollowingUser = async (id: string, userId: string) => {
  const otherUser = await userModel.findById(id);
  if (!otherUser) {
    throw new Error('User not found!');
  }

  if (otherUser.id === userId) {
    return true;
  }

  const existingFollow = await followModel.findOne({
    followingId: otherUser.id,
    followedById: userId,
  });

  return !!existingFollow;
};

export const followUser = async (id: string, userId: string) => {
  const otherUser = await userModel.findById(id);
  if (!otherUser) {
    throw new Error('User not found!');
  }

  if (otherUser.id === userId) {
    throw new Error('Cannot follow yourself!');
  }

  const existingFollow = await followModel.findOne({
    followingId: otherUser.id,
    followedById: userId,
  });

  if (existingFollow) {
    throw new Error('Already following this user!');
  }

  const follow = new followModel({
    followingId: otherUser.id,
    followedById: userId,
  });

  await follow.save();
  const resFollow = await followModel
    .findById(follow.id)
    .populate<{ following: TUser; followedBy: TUser }>(['following', 'followedBy']);
  return resFollow;
};

export const unfollowUser = async (id: string, userId: string) => {
  const otherUser = await userModel.findById(id);
  if (!otherUser) {
    throw new Error('User not found!');
  }

  if (otherUser.id === userId) {
    throw new Error('Cannot unfollow yourself!');
  }

  const existingFollow = await followModel
    .findOneAndDelete({
      followingId: otherUser.id,
      followedById: userId,
    })
    .populate<{ following: TUser }>(['following']);

  if (!existingFollow) {
    throw new Error('Already unfollowed this user!');
  }

  return existingFollow;
};

export const getFollowedUsers = async (userId: string) => {
  const users = await followModel
    .find({ followedById: userId })
    .populate<{ following: TUser & { stream: TStream } }>({
      path: 'following',
      populate: {
        path: 'stream',
        model: 'Stream',
        select: 'isLive',
      },
    });
  return users;
};
