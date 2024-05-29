import { TModel } from './document';
import { z } from 'zod';

const ZFollow = z.object({
  followingId: z.string(),
  followingById: z.string(),
});

export type TFollow = z.infer<typeof ZFollow> & TModel;
