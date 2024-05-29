'use client';

import type { TFollow } from '@repo/types/follow';
import type { TUser } from '@repo/types/user';
import { Heart } from 'lucide-react';
import { UserItem, UserItemSkeleton } from './user-item';
import { Hint } from '@/components/hint';
import { useSidebar } from '@/store/use-sidebar';

interface FollowingProps {
  data: (TFollow & {
    following: TUser & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export function Following({ data }: FollowingProps): JSX.Element {
  const { isExpanded } = useSidebar((state) => state);

  if (!data.length) {
    return <>{null}</>;
  }

  return (
    <div>
      {isExpanded ? (
        <div className="mb-4 pl-6">
          <p className="text-muted-foreground text-sm">Following</p>
        </div>
      ) : (
        <div className="mb-3 flex items-center justify-center">
          <Hint side="right" label={'Following'} asChild>
            <Heart className="size-6 text-primary" />
          </Hint>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            id={follow.following._id}
            key={follow.following._id}
            username={follow.following.name}
            imageUrl={follow.following.image ?? ''}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export function FollowingSkeleton(): JSX.Element {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[1, 2, 3].map((_) => (
        <UserItemSkeleton key={_} />
      ))}
    </ul>
  );
}
