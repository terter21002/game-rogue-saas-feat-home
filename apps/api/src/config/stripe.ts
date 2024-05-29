import Stripe from 'stripe';
import { stripeSecretKey } from './const';

export const stripe = new Stripe(stripeSecretKey);
