import { z } from 'zod';
import { TModel } from './document';

const ZSubscription = z.object({
  subscriptionId: z.string(),
  subscriptionById: z.string(),
  isActive: z.boolean(),
  isExpired: z.boolean(),
});

export type TSubscription = z.infer<typeof ZSubscription> & TModel;
