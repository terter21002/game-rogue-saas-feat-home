'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TOrganizationCreate, ZOrganizationCreate } from '@repo/types';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/components/nextui/button';
import { Input } from '@ui/components/nextui/input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/config/const';
import { useUpdateOrganization } from '@/hooks/use-organization';
import { useProfile } from '@/hooks/use-profile';

export default function OrganizationCreatePageComponent() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<TOrganizationCreate>({
    mode: 'onChange',
    resolver: zodResolver(ZOrganizationCreate),
  });
  const { mutate: createOrganization, isPending } = useUpdateOrganization();
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (profile?._id) setValue('userId', profile?._id);
  }, [profile?._id, setValue]);
  const onSubmit = (data: TOrganizationCreate) => {
    createOrganization(
      { data },
      {
        onError(error) {
          toast.error(error.message);
        },
        onSuccess() {
          toast.success(`Organization ${data.name} created successfully`);
          reset();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.organizations],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.auth_organization],
          });
        },
      }
    );
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className="flex flex-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <Input
          {...register('name')}
          isInvalid={!!errors['name']}
          errorMessage={errors['name']?.message}
          label="Name"
          variant="bordered"
        />
        <Input
          {...register('description')}
          isInvalid={!!errors['description']}
          errorMessage={errors['description']?.message}
          label="Description"
          variant="bordered"
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            type="reset"
            color="secondary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting || isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="success"
            isDisabled={!isValid || isSubmitting}
            isLoading={isSubmitting || isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
