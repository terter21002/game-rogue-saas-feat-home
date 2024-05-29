import NextAuth from 'next-auth';
import { authOptions } from './auth.config';

const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authOptions);

export { GET, POST, auth };
