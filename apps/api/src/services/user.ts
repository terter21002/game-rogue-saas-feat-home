import followModel from '@/models/follow';
import streamModel from '@/models/stream';
import userModel from '@/models/user';
import { TStream } from '@repo/types';
import { TUser } from '@repo/types/user';

export const getUserById = async (id: string) => {
  const user = await userModel.findById(id);
  const stream = await streamModel.findOne({ userId: user?.id }).populate('tags');
  const _count = await followModel.find({ followingId: user?.id }).countDocuments();
  return { ...user?.toJSON(), _count: { followedBy: _count }, stream };
};

export const updateUser = async (data: Partial<TUser>, userId: string) => {
  const user = await userModel.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

export const getRecommended = async (userId: string) => {
  let users = [];

  if (userId && userId !== 'undefined') {
    const followedUsers = await followModel.find({ followedById: userId }).distinct('followingId');
    users = await userModel
      .find({
        $and: [{ _id: { $ne: userId } }, { _id: { $nin: followedUsers } }],
      })
      .sort({ createdAt: -1 })
      .populate<{ stream: TStream }>({
        path: 'stream',
        select: 'isLive',
      });
  } else {
    users = await userModel.find().sort({ createdAt: -1 }).populate<{ stream: TStream }>({
      path: 'stream',
      select: 'isLive',
    });
  }

  return users;
};
