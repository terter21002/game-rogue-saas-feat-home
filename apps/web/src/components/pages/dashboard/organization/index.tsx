'use client';

import { Button } from '@ui/components/nextui/button';
import ProfileAvatarComponent from '@ui/components/shared/profile-avatar';
import { Alert } from '@ui/components/ui/alert';
import { Spinner } from '@ui/components/ui/spinner';
import { Plus } from '@ui/icons';
import Link from 'next/link';
import { useOrganizations } from '@/hooks/use-organization';

export default function OrganizationIndexPageComponent() {
  const { data: organizations, error, isPending } = useOrganizations();
  return (
    <div className="h-auto w-full flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="col-span-12">
          <Button
            as={Link}
            href="/dashboard/organization/new"
            isIconOnly
            color="primary"
            radius="full"
            variant="bordered"
          >
            <Plus />
          </Button>
        </div>
        {isPending ? (
          <div className="col-span-12">
            {' '}
            <Spinner />
          </div>
        ) : error ? (
          <Alert variant={'destructive'}>{error.message}</Alert>
        ) : (
          organizations.map((organization) => (
            <div key={organization._id} className="flex w-full items-center gap-2">
              <ProfileAvatarComponent src={organization.image} name={organization.name} />
              <Link href={`/dashboard/organization/${organization._id}`}>{organization.name}</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
