'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/components/ui/button';
import { Skeleton } from '@ui/components/ui/skeleton';
import { cn } from '@ui/lib/utils';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { CheckoutForm } from '../checkout-form';
import { onFollow, onUnfollow } from '@/actions/follow';
import { useProfile } from '@/hooks/use-profile';

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
  isSubscribed: boolean;
}

export function Actions({
  hostIdentity,
  isHost,
  isFollowing,
  isSubscribed,
}: ActionsProps): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useProfile();
  const { mutate: follow } = useMutation({
    mutationKey: ['follow'],
    mutationFn: async ({ id }: { id: string }) => {
      return await onFollow(id);
    },
  });
  const { mutate: unfollow } = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: async ({ id }: { id: string }) => {
      return await onUnfollow(id);
    },
  });
  const handleFollow = (): void => {
    startTransition(() => {
      follow(
        { id: hostIdentity },
        {
          onSuccess(data) {
            toast.success(`You are now following: ${data?.following.name}!`);
            queryClient.invalidateQueries({ queryKey: ['following'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
          },
          onError(error) {
            if (error instanceof Error) {
              toast.error(error.message || 'Something went wrong!');
            }
          },
        }
      );
    });
  };

  const handleUnfollow = (): void => {
    startTransition(() => {
      unfollow(
        { id: hostIdentity },
        {
          onSuccess(data) {
            console.log(data);

            toast.success(`You have unfollowed: ${data?.following.name}!`);
            queryClient.invalidateQueries({ queryKey: ['following'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
          },
          onError(error) {
            if (error instanceof Error) {
              toast.error(error.message || 'Something went wrong!');
            }
          },
        }
      );
    });
  };

  const toggleFollow = (): void => {
    if (!data?._id) {
      router.push('/');
      return;
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={toggleFollow}
        disabled={isPending || isHost}
        // variant="primary"
        size="sm"
        className="w-full lg:w-auto"
      >
        <Heart className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-rose-600')} />
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      {isSubscribed ? (
        <Button
          disabled
          //  variant="primary"
          size="sm"
        >
          subscribed
        </Button>
      ) : (
        <CheckoutForm disabled={isHost} />
      )}
    </div>
  );
}

export function ActionsSkeleton(): JSX.Element {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}
