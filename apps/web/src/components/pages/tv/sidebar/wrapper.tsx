'use client';

import { cn } from '@ui/lib/utils';
import { useIsClient } from 'usehooks-ts';
import { FollowingSkeleton } from './following';
import { RecommendedSkeleton } from './recommended';
import { ToggleSkeleton } from './toggle';

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps): JSX.Element {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <aside className={cn('flex flex-col h-full w-full bg-background')}>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return <aside className={cn('flex flex-col h-full w-full bg-background')}>{children}</aside>;
}
