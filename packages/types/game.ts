import { TPlatformEnum } from './platform';
import z from 'zod';

export const ZGame = z.object({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  banner: z.string().optional(),
  url: z.string().optional(),
  platforms: z.array(z.nativeEnum(TPlatformEnum)).optional(),
});

export const ZGameCreate = ZGame.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
}).partial({ platforms: true });

export const ZGameUpdate = ZGame.partial();

export type TGame = z.infer<typeof ZGame>;

export type TGameCreate = z.infer<typeof ZGameCreate>;
