'use client';

import { User } from '@ui/components/nextui/user';
import { Spinner } from '@ui/components/ui/spinner';
import Image from 'next/image';
import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import { useProfile } from '@/hooks/use-profile';

export default function DashboardHomePage(): JSX.Element {
  const { data: profile, error, isPending } = useProfile();
  return (
    <DashboardPageWrapperComponent title="Home">
      <div className="grid h-fit w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border p-4 text-center">
          {!isPending ? (
            <>
              {profile?.banner ? (
                <Image
                  alt="banner"
                  className="absolute z-0 size-full object-cover opacity-80"
                  height={200}
                  src={profile.banner}
                  width={600}
                />
              ) : (
                <div className="absolute z-0 size-full bg-primary" />
              )}
              <div className="z-10 flex items-center gap-2">
                {error ? (
                  <div>{error.message}</div>
                ) : (
                  <User
                    avatarProps={{
                      src: profile.image,
                      alt: profile.name,
                      color: 'primary',
                      isBordered: true,
                    }}
                    description={profile.email}
                    name={profile.name}
                    className="flex-1"
                    classNames={{
                      name: 'drop-shadow-lg',
                      description: 'drop-shadow-lg',
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </DashboardPageWrapperComponent>
  );
}
