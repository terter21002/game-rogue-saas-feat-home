/* eslint-disable react/jsx-no-leaked-render */
'use client';

import type { TCountryCode } from '@repo/types';
import { getInitialNickname } from '@repo/utils/avatar';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar } from '@ui/components/nextui/avatar';
import { Button } from '@ui/components/nextui/button';
import { Input } from '@ui/components/nextui/input';
import CountrySelectComponent from '@ui/components/shared/country-select';
import { Spinner } from '@ui/components/ui/spinner';
import { Check, Edit, Pencil, X } from '@ui/icons';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import { useProfile, useUpdateProfile } from '@/hooks/use-profile';

export default function ProfilePage(): JSX.Element {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: profile, error, isPending, queryKey } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating, error: updateError } = useUpdateProfile();
  const [name, setName] = useState<string>();
  const [banner, setBanner] = useState<File>();
  const [image, setImage] = useState<File>();
  const [country, setCountry] = useState<TCountryCode | null>(null);

  const imageUrl = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return profile?.image ?? session?.user.image;
  }, [image, profile?.image, session?.user.image]);

  const bannerUrl = useMemo(() => {
    if (banner) {
      return URL.createObjectURL(banner);
    }
    return profile?.banner ?? '';
  }, [banner, profile?.banner]);

  const onReset = (): void => {
    setImage(undefined);
    setBanner(undefined);
    setName(undefined);
    setCountry(profile?.country ?? null);
  };

  const onCheck = (): void => {
    updateProfile(
      { name, image, banner, country },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey });
        },
      }
    );
  };

  const isChanged = useMemo(() => {
    return (
      image ||
      banner ||
      (name && name !== profile?.name) ||
      country?.toLowerCase() !== profile?.country?.toLocaleLowerCase()
    );
  }, [image, banner, country, name, profile]);

  useEffect(() => {
    onReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <DashboardPageWrapperComponent title="Profile">
      <div className="flex w-full flex-col flex-wrap">
        <div className="flex w-full justify-center">
          {isPending ? (
            <Spinner />
          ) : error ? (
            <>{error.message}</>
          ) : (
            <div className="relative flex h-auto w-72 flex-col items-center overflow-hidden rounded-xl border">
              <div className="group relative h-24 w-full bg-primary">
                {profile.banner ? (
                  <Image
                    alt="banner"
                    priority
                    className="z-0 size-full rounded-t-xl object-cover"
                    height={200}
                    src={bannerUrl}
                    width={600}
                  />
                ) : (
                  <div className="bg-muted z-0 size-full rounded-t-xl" />
                )}
                <div className="absolute left-0 top-0 z-10 size-full bg-gradient-to-b from-transparent via-transparent to-transparent group-hover:from-primary" />
                <Button
                  onClick={() => {
                    document.getElementById('banner-image')?.click();
                  }}
                  variant="flat"
                  className="absolute left-2 top-2 z-10 hidden group-hover:flex"
                  radius="full"
                  size="sm"
                  isIconOnly
                >
                  <input
                    accept="*.jpg | *.png | *.bmp"
                    type="file"
                    id="banner-image"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setBanner(e.target.files[0]);
                    }}
                  />
                  <Edit className="size-4" />
                </Button>
              </div>
              <div className="group relative -mb-12 -translate-y-12">
                <Avatar
                  isBordered
                  color="primary"
                  className="size-24"
                  src={imageUrl ?? undefined}
                  size="lg"
                  name={getInitialNickname(profile.name)}
                />
                <Button
                  onClick={() => {
                    document.getElementById('avatar-image')?.click();
                  }}
                  className="absolute -bottom-2 -right-2 hidden group-hover:flex"
                  radius="full"
                  size="sm"
                  isIconOnly
                >
                  <input
                    accept="*.jpg | *.png | *.bmp"
                    type="file"
                    id="avatar-image"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setImage(e.target.files[0]);
                    }}
                  />
                  <Edit className="size-4" />
                </Button>
              </div>
              <div className="relative flex w-full flex-col gap-2 p-4">
                <div className="flex items-center justify-center gap-2 pl-6 text-center">
                  {name ? (
                    <>
                      <Input value={name} onValueChange={setName} />
                      <Button
                        onClick={() => {
                          setName(undefined);
                        }}
                        size="sm"
                        radius="full"
                        variant="light"
                        isIconOnly
                      >
                        <X className="size-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      {profile.name}
                      <Button
                        onClick={() => {
                          setName(profile.name);
                        }}
                        size="sm"
                        radius="full"
                        variant="light"
                        isIconOnly
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="text-muted-foreground text-center text-sm">{profile.email}</div>
                <div className="flex w-full items-center">
                  <CountrySelectComponent
                    placeholder="Choose your country"
                    variant={country !== profile.country ? 'flat' : 'bordered'}
                    fullWidth
                    val={country ?? undefined}
                    onChange={(val) => {
                      setCountry(val ?? null);
                    }}
                  />
                  <Button
                    onClick={() => {
                      setCountry(null);
                    }}
                    size="sm"
                    radius="full"
                    variant="light"
                    isIconOnly
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                {isChanged && (
                  <div className="flex items-center justify-center gap-2">
                    {updateError && (
                      <div className="text-danger bg-danger/10 border-danger rounded-lg border">
                        {updateError.message}
                      </div>
                    )}
                    <Button
                      isLoading={isUpdating}
                      onClick={onCheck}
                      size="sm"
                      radius="full"
                      variant="light"
                      isIconOnly
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      isLoading={isUpdating}
                      onClick={() => {
                        onReset();
                      }}
                      size="sm"
                      radius="full"
                      variant="light"
                      isIconOnly
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardPageWrapperComponent>
  );
}
