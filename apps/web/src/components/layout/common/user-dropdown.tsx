'use client';

import { Button } from '@ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/components/ui/dropdown-menu';
import { Spinner } from '@ui/components/ui/spinner';
import { UserCircle } from '@ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useProfile } from '@/hooks/use-profile';

export default function UserDropdownComponent(): JSX.Element {
  const { data: session, status } = useSession();
  const { data: profile } = useProfile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'unauthenticated' ? (
            <UserCircle />
          ) : (
            <Image
              alt="Avatar"
              className="overflow-hidden rounded-full"
              height={36}
              src={profile?.image ?? session?.user.image ?? ''}
              width={36}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === 'authenticated' ? (
          <>
            <DropdownMenuLabel asChild>
              <div className="select-none text-pretty text-primary">
                {profile?.name ?? session.user.name ?? ''}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              signIn();
            }}
          >
            LogIn
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
