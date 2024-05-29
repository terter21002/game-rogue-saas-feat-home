/* eslint-disable no-unused-vars */
import { z } from 'zod';

export enum TSocialType {
  Youtube = 'youtube',
  Twitter = 'twitter',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Discord = 'discord',
  Twitch = 'twitch',
}

export const ZSocialItem = z.object({
  _id: z.string(),
  type: z.nativeEnum(TSocialType),
  url: z.string(),
});

export type TSocialItem = z.infer<typeof ZSocialItem>;

export const ZSocialItemUpdate = ZSocialItem.omit({
  _id: true,
}).partial({
  url: true,
});

export type TSocialItemUpdate = z.infer<typeof ZSocialItemUpdate>;
