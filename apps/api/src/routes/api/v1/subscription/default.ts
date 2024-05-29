import { stripeWebhookSecret } from '@/config/const';
import { stripe } from '@/config/stripe';
import {
  createSubscriptionSession,
  isSubscribedUser,
  updatedSubscription,
} from '@/services/subscription';
import { TApiResponse, TUser } from '@repo/types';
import type { Request, Response } from 'express';

export const createSubscriptionController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const data = await createSubscriptionSession(user._id, req.body.id);
  return res.json({
    data,
    success: true,
    message: 'success',
  } as TApiResponse<{ client_secret: string }>);
};

export const subscriptionWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  //@ts-ignore
  const metadata = event.data.object.metadata;
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      await updatedSubscription(metadata.id, true);
      break;
    case 'customer.subscription.updated':
      // TODO: Handle subscription updated event
      break;
    case 'customer.subscription.deleted':
      // TODO: Handle subscription deleted event
      break;
    default:
      return res.status(400).end();
  }

  res.json({ received: true });
};

export const checkUserSubscribesController = async (req: Request, res: Response) => {
  const user = res.locals.user as TUser;
  const userId = user._id;
  const id = req.params.id;
  const isSubscribed = await isSubscribedUser(id, userId);
  return res.json({
    data: { value: isSubscribed },
    success: true,
    message: 'success',
  } as TApiResponse<{ value: boolean }>);
};
