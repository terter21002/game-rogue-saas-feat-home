'use client';

import { Button } from '@ui/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { onFollow, onUnfollow } from '@/actions/follow';

interface ActionsProps {
  isFollowing: boolean;
  isSubscribed: boolean;
  isBlocking: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const handleFollow = (): void => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`Followed the User: ${data.following.name}`))
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message);
          }
        });
    });
  };

  const handleUnfollow = (): void => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`Unfollowed: ${data.following.name}`))
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message);
          }
        });
    });
  };

  return (
    <Button
      // variant="primary"
      disabled={isPending}
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
