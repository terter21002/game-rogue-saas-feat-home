import gameModel from '@/models/game';
import { removeFromGoogleStorage } from '@/utils/storage';
import { ZGameCreate, ZGameUpdate } from '@repo/types';
import { Request, Response, Express } from 'express';
import path from 'path';

export const getGames = async (req: Request, res: Response) => {
  const items = await gameModel.find({});
  return res.json({
    data: items,
    success: true,
    message: 'success',
  });
};

export const createGame = async (req: Request, res: Response) => {
  if (req.files) {
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const banner = files['banner']?.[0];
    const image = files['image']?.[0];
    if (banner) {
      req.body.banner = path.join('/uploads', banner.destination).replace(/\\/g, '/');
    }
    if (image) {
      req.body.image = path.join('/uploads', image.destination).replace(/\\/g, '/');
    }
  }
  const payload = ZGameCreate.safeParse(req.body);
  if (payload.success) {
    const item = await gameModel.create(payload.data);
    return res.json({
      success: true,
      message: 'success',
      data: item,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: payload.error.errors[0].path + ': ' + payload.error.errors[0].message,
      data: null,
    });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const item = await gameModel.findById(gameId);
  if (!item)
    return res.status(404).json({
      success: false,
      message: 'Game not found',
      data: null,
    });
  if (req.files) {
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const banner = files['banner']?.[0];
    const image = files['image']?.[0];
    if (banner) {
      req.body.banner = path.join('/uploads', banner.destination).replace(/\\/g, '/');
      if (item.banner) await removeFromGoogleStorage({ url: item.banner });
    }
    if (image) {
      req.body.image = path.join('/uploads', image.destination).replace(/\\/g, '/');
      if (item.image) await removeFromGoogleStorage({ url: item.image });
    }
  }
  const payload = ZGameUpdate.safeParse(req.body);
  if (payload.success) {
    await item.updateOne(payload.data);
    return res.json({
      success: true,
      message: 'success',
      data: item,
      payload: payload.data,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: payload.error.errors[0].path + ': ' + payload.error.errors[0].message,
    });
  }
};
