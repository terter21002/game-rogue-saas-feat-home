import { stripeSecretKey } from '@/config/const';
import subscriptionModel from '@/models/subscription';
import userModel from '@/models/user';
import { TUser } from '@repo/types';
import { Stripe } from 'stripe';

const stripe = new Stripe(stripeSecretKey);

export const createSubscriptionSession = async (userId: string, id: string) => {
  try {
    const subscriptionData = await createSubscription(id, userId);
    const subscription = await stripe.subscriptions.create({
      customer: 'cus_Pt0LVVF40HUl4g',
      collection_method: 'charge_automatically',
      items: [{ price: 'price_1P50otLZvTUR5WIHEpjO23Eh' }],
      metadata: {
        id: subscriptionData?.id,
      },
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });
    if (subscription.latest_invoice) {
      //@ts-ignore
      const latest_invoice = subscription.latest_invoice.id;

      const invoice = await stripe.invoices.retrieve(latest_invoice, {
        expand: ['payment_intent'],
      });

      const payment_intent = invoice.payment_intent;
      return payment_intent;
    } else {
      throw new Error('Error: Invalid invoice');
    }
  } catch (error: any) {
    // throw new ApiError(error.message, 500);
  }
};

export const isSubscribedUser = async (id: string, userId: string) => {
  try {
    const otherUser = await userModel.findById(id);
    if (!otherUser) {
      throw new Error('User not found!');
    }

    if (otherUser.id === userId) {
      return true;
    }

    const existingSubscription = await subscriptionModel.findOne({
      subscriptionId: otherUser.id,
      subscriptionById: userId,
      isActive: true,
    });
    return !!existingSubscription;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createSubscription = async (id: string, userId: string) => {
  const otherUser = await userModel.findById(id);
  if (!otherUser) {
    throw new Error('User not found!');
  }

  if (otherUser.id === userId) {
    throw new Error('Cannot subscribe yourself!');
  }

  const existingSubscribe = await subscriptionModel.findOne({
    subscriptionId: otherUser.id,
    subscriptionById: userId,
  });

  if (existingSubscribe) {
    throw new Error('Already subscribing to this user!');
  }

  const subscription = await subscriptionModel.create({
    subscriptionId: otherUser.id,
    subscriptionById: userId,
  });
  const resSub = await subscriptionModel
    .findById(subscription.id)
    .populate<{ subscription: TUser; subscriptionBy: TUser }>(['subscription', 'subscriptionBy']);
  return resSub;
};

export const updatedSubscription = async (id: string, isSubscribed: boolean) => {
  try {
    await subscriptionModel.findByIdAndUpdate(id, { isActive: isSubscribed });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
