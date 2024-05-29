'use client';

import type { TUser } from '@repo/types/user';
import { Video } from 'lucide-react';
import { UserItem, UserItemSkeleton } from './user-item';
import { Hint } from '@/components/hint';
import { useSidebar } from '@/store/use-sidebar';

interface RecommendedProps {
  data: (TUser & {
    stream: { isLive: boolean } | null;
  })[];
}

export function Recommended({ data }: RecommendedProps): JSX.Element {
  const { isExpanded } = useSidebar((state) => state);
  const showLabel = isExpanded && data.length > 0;

  return (
    <div>
      {showLabel ? (
        <div className="mb-3 pl-6">
          <p className="text-muted-foreground text-sm">Recommended</p>
        </div>
      ) : data.length > 0 ? (
        <div className="mb-3 flex items-center justify-center">
          <Hint side="right" label={'Recommended'} asChild>
            <Video className="size-6 text-primary" />
          </Hint>
        </div>
      ) : null}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user._id}
            id={user._id}
            username={user.name}
            imageUrl={user.image ?? ''}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton(): JSX.Element {
  return (
    <ul className="px-2">
      {[1, 2, 3].map((_) => (
        <UserItemSkeleton key={_} />
      ))}
    </ul>
  );
}
