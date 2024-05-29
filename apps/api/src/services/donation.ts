import { stripeSecretKey } from '@/config/const';
import Stripe from 'stripe';

const stripe = new Stripe(stripeSecretKey);

export const createDonation = async (amount: number) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    customer: 'cus_Pt0LVVF40HUl4g',
    automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
  });
};
