'use client';

import { TOrganization } from '@repo/types';
import { Button } from '@ui/components/nextui/button';
import ProfileAvatarComponent from '@ui/components/shared/profile-avatar';
import { ArrowLeft } from '@ui/icons';
import Link from 'next/link';
import { useEffect } from 'react';
import { useOrganization } from '@/store/use-organization';

export default function SingleOrganizationPageComponent(props: {
  organization: TOrganization;
  id: string;
}) {
  const { id, organization } = props;
  const { setCurrentOrganization } = useOrganization();
  useEffect(() => {
    setCurrentOrganization(organization);
    return () => {
      setCurrentOrganization(undefined);
    };
  }, [organization, setCurrentOrganization]);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Button
        isIconOnly
        color="primary"
        variant="bordered"
        radius="full"
        as={Link}
        href="/dashboard/organization"
      >
        <ArrowLeft />
      </Button>
      <ProfileAvatarComponent name={organization.name} src={organization.image} size="lg" />
      <div>ID: {id}</div>
      <div>Name: {organization.name}</div>
    </div>
  );
}
