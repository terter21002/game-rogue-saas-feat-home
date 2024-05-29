import { z } from 'zod';
import { TModel } from './document';
import { ZSocialItem } from './social';
import { TUser } from 'user';

export const ZOrganization = z.object({
  name: z.string().min(5, 'Name should be at least 5 characters long'),
  description: z.string().optional(),
  userId: z.string(),
  image: z.string().optional(),
  banner: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  isActive: z.boolean().default(true).optional(),
  social: z.array(ZSocialItem.partial({ _id: true })).optional(),
});

export type TOrganization = z.infer<typeof ZOrganization> & {
  user?: TUser;
} & TModel;

export const ZOrganizationUpdate = ZOrganization.omit({
  social: true,
}).partial();

export type TOrganizationUpdate = z.infer<typeof ZOrganizationUpdate>;

export const ZOrganizationCreate = ZOrganization.omit({
  social: true,
});

export interface TProfileImageForm {
  image?: Blob;
  banner?: Blob;
}

export type TOrganizationCreate = z.infer<typeof ZOrganizationCreate>;
