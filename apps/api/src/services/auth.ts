import type { Document } from 'mongoose';
import { TUser } from '@repo/types';

export const parseToken = (authHeader: string) => {
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  return token;
};

export const updateUserProfile = async (props: {
  user: TUser & Document;
  params: Partial<TUser>;
}) => {
  const { user, params } = props;
  const updatedUser = await user.updateOne(params);
  return updatedUser;
};
