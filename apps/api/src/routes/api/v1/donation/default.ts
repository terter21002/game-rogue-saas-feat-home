import { createDonation } from '@/services/donation';
import { TApiResponse } from '@repo/types';
import type { Request, Response } from 'express';

export const createDonationController = async (req: Request, res: Response) => {
  const paymentIntent = await createDonation(req.body.amount);
  return res.json({
    data: { client_secret: paymentIntent.client_secret },
    success: true,
    message: 'success',
  } as TApiResponse<{ client_secret: string }>);
};
