import { TModel } from './document';
import { z } from 'zod';

const ZStream = z.object({
  name: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  description: z.string().optional(),
  ingressId: z.string().optional(),
  serverUrl: z.string().optional(),
  streamKey: z.string().optional(),
  isLive: z.boolean(),
  isChatEnabled: z.boolean(),
  isChatDelayed: z.boolean(),
  isChatFollowersOnly: z.boolean(),
  isChatSubscriberOnly: z.boolean(),
  userId: z.string(),
});

export type TStream = z.infer<typeof ZStream> & TModel;
