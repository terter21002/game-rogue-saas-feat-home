'use server';

import type { Session } from 'next-auth';
import { auth } from '@/auth';

export default async function getSession(): Promise<Session | null> {
  const session = await auth();
  return session;
}
