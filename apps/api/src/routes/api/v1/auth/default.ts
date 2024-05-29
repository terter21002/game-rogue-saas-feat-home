import organizationModel from '@/models/organization';
import { updateUserProfile } from '../../../../services/auth';
import { TApiResponse, TUser, ZUser, ZUserProfileUpdate } from '@repo/types';
import type { Request, Response, Express } from 'express';
import type { Document } from 'mongoose';
import * as path from 'path';
import { removeFromGoogleStorage } from '@/utils/storage';

export const getProfile = async (req: Request, res: Response) => {
  const user = ZUser.safeParse(res.locals.user);
  if (user.success) {
    return res.json({
      data: res.locals.user,
      success: true,
      message: 'success',
    } as TApiResponse<TUser>);
  } else {
    return res.status(401).json({
      success: false,
      message: user.error.message,
      data: null,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser & Document;
  let payload: Record<string, any> = {};
  const parsedPayload = ZUserProfileUpdate.safeParse(req.body);
  if (parsedPayload.success) {
    payload = parsedPayload.data;
    if (req.files) {
      // eslint-disable-next-line no-undef
      const files = req.files as { [key: string]: Express.Multer.File[] };
      const banner = files['banner']?.[0];
      const image = files['image']?.[0];
      if (banner) {
        payload.banner = path.join('/uploads', banner.destination).replace(/\\/g, '/');
        if (user.banner) await removeFromGoogleStorage({ url: user.banner });
      }
      if (image) {
        payload.image = path.join('/uploads', image.destination).replace(/\\/g, '/');
        if (user.image) await removeFromGoogleStorage({ url: user.image });
      }
    }
    const updatedUser = await updateUserProfile({ user, params: payload });
    return res.json({
      data: updatedUser,
      success: true,
      message: 'success',
    } as TApiResponse<TUser>);
  } else {
    return res.status(400).json({
      success: false,
      message: parsedPayload.error.errors[0].message,
      data: null,
    });
  }
};

export const getUserOrganizations = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const organizations = await organizationModel.find({ userId: user._id });
  return res.json({
    data: organizations,
    success: true,
    message: 'success',
  });
};
