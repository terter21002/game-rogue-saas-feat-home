import { z } from 'zod';
import { TCountryCode } from './country';
import { TModel } from './document';

export enum TUserRole {
  Super = 'super',
  Admin = 'admin',
  User = 'user',
  Moderator = 'mod',
}

export enum TUserStatus {
  Active = 'active',
  DND = 'dnd',
  Away = 'away',
  Offline = 'offline',
}

export enum TUserGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const ZUser = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),
  image: z.string().optional(),
  banner: z.string().optional(),
  providers: z.array(z.string()),
  role: z.nativeEnum(TUserRole).default(TUserRole.User),
  status: z.nativeEnum(TUserStatus).optional(),
  age: z.number().min(10).max(150).optional(),
  gender: z.nativeEnum(TUserGender).optional(),
  country: z.nativeEnum(TCountryCode).optional(),
});

export const ZUserProfileUpdate = z.object({
  name: z.string().min(4).max(20).optional(),
  country: z.nativeEnum(TCountryCode).optional(),
});

export type TUser = z.infer<typeof ZUser> & TModel;
