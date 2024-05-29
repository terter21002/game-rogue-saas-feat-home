import {
  deleteStreamThumbnailById,
  getStreamByUserId,
  getStreams,
  updateStreamById,
  updateStreamByUserId,
} from '@/services/stream';
import { getTags, updateTags } from '@/services/tag';
import { getRecommended } from '@/services/user';
import { removeFromGoogleStorage } from '@/utils/storage';
import { TApiResponse, TStream, TTagInput, TUser } from '@repo/types';
import type { Request, Response } from 'express';
import { TTag } from 'node_modules/@repo/types';
import path from 'path';

export const getStreamByUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const streams = await getStreamByUserId(userId);
  return res.json({
    data: streams,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const getStreamController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const streams = await getStreamByUserId(userId);
  return res.json({
    data: streams,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const getStreamsController = async (req: Request, res: Response) => {
  const streams = await getStreams();
  return res.json({
    data: streams,
    success: true,
    message: 'success',
  });
};

export const getStreamsRecommendedController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const streams = await getRecommended(userId);
  return res.json({
    data: streams,
    success: true,
    message: 'success',
  } as TApiResponse<(TUser & { stream: TStream })[]>);
};

export const updateStreamByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const stream = await updateStreamById(data, id);
  return res.json({
    data: stream,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const updateStreamTagsByUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const data = req.body as TTagInput[];
  const stream = await updateTags(data, id);
  return res.json({
    data: stream,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const updateStreamByUserIdController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = req.body;
  const stream = await updateStreamByUserId(data, userId);
  return res.json({
    data: stream,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const updateThumbnail = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser & Document;
  const stream = await getStreamByUserId(user._id);

  let payload: Record<string, any> = {};

  if (req.files) {
    // eslint-disable-next-line no-undef
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const thumbnail = files['thumbnail']?.[0];
    if (thumbnail) {
      payload.thumbnailUrl = path.join('/uploads', thumbnail.destination).replace(/\\/g, '/');
      if (stream?.thumbnailUrl) await removeFromGoogleStorage({ url: stream?.thumbnailUrl });
    }
  }
  const updatedStream = await updateStreamById({ thumbnailUrl: payload.thumbnailUrl }, stream?._id);
  return res.json({
    data: updatedStream,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const deleteThumbnail = async (_: Request, res: Response) => {
  const user = res.locals.user as TUser & Document;
  const stream = await getStreamByUserId(user._id);
  if (stream?.thumbnailUrl) await removeFromGoogleStorage({ url: stream?.thumbnailUrl });
  const updatedStream = await deleteStreamThumbnailById(stream?.thumbnailUrl, stream?._id);
  return res.json({
    data: updatedStream,
    success: true,
    message: 'success',
  } as TApiResponse<TStream>);
};

export const getTagsController = async (req: Request, res: Response) => {
  const tags = await getTags();
  return res.json({
    data: tags,
    success: true,
    message: 'success',
  } as TApiResponse<TTag[]>);
};
