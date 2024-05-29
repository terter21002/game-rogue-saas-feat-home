/* eslint-disable @typescript-eslint/no-non-null-assertion */
import sign from 'jwt-encode';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { authConfig, isDev } from './config/const';

export const authOptions: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [Google(authConfig.google)],
  secret: authConfig.secret,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  debug: isDev,
  callbacks: {
    session({ session }) {
      session.sessionToken = sign(session.user, authConfig.secret);
      return session;
    },
  },
  trustHost: !isDev ? true : undefined,
} satisfies NextAuthConfig;
