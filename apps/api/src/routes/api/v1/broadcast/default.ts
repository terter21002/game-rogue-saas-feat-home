import { getBroadcasts } from '@/services/broadcast';
import { TApiResponse, TBroadcast } from '@repo/types';
import type { Request, Response } from 'express';

export const getBroadcastsController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const broadcasts = await getBroadcasts(id);
  return res.json({
    data: broadcasts,
    success: true,
    message: 'success',
  } as TApiResponse<TBroadcast[]>);
};
