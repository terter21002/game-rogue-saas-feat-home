import { TModel } from './document';
import { z } from 'zod';

const ZBroadcast = z.object({
  url: z.string(),
  isComplete: z.boolean(),
  userId: z.string(),
  streamId: z.string(),
});

export type TBroadcast = z.infer<typeof ZBroadcast> & TModel;
