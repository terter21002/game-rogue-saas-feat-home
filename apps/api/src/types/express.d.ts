/* eslint-disable no-unused-vars */
import { TStream, TUser } from '@repo/types';

declare global {
  namespace Express {
    interface Locals {
      user: TUser & { stream?: TStream };
    }
  }
}
