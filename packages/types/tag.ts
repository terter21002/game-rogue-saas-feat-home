import { TModel } from './document';
import { z } from 'zod';

const ZTag = z.object({
  type: z.string().optional(),
  name: z.string(),
  isDisabled: z.boolean().default(false),
});

export type TTag = z.infer<typeof ZTag> & TModel;
export type TTagInput = z.infer<typeof ZTag>;
