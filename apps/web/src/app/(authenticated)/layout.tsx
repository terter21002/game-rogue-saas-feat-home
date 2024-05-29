'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { type ReactNode, useEffect } from 'react';
import { useProfile } from '@/hooks/use-profile';

export default function AuthorizedLayout({ children }: { children: ReactNode }): ReactNode {
  const { error } = useProfile();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      signOut()
        .catch(() => {
          // do nothing
        })
        .finally(() => {
          router.push('/');
        });
    }
  }, [error, router]);

  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
