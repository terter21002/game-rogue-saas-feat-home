'use client';

import { ArrowLeftToLine } from '@repo/ui/icons';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@ui/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/components/ui/sheet';
import { cn } from '@ui/lib/utils';
import { type ReactNode } from 'react';
import { Sidebar } from '@/components/pages/tv/sidebar';
import { getFollowedUsers } from '@/request/follow';
import { getRecommended } from '@/request/stream';
import { useSidebar } from '@/store/use-sidebar';

export default function TVLayoutComponent({ children }: { children: ReactNode }): JSX.Element {
  const { isExpanded } = useSidebar((state) => state);
  const recommendedQuery = useQuery({
    queryKey: ['recommended'],
    queryFn: async () => {
      return await getRecommended();
    },
    refetchInterval: 1000,
  });
  const followingQuery = useQuery({
    queryKey: ['following'],
    queryFn: async () => {
      return await getFollowedUsers();
    },
    refetchInterval: 1000,
  });
  return (
    <div className={cn('flex w-full overflow-auto flex-1')}>
      <div
        className={cn('bg-muted/40 hidden border-r md:block', {
          'w-[240px]': isExpanded,
          'w-[70px]': !isExpanded,
        })}
      >
        <Sidebar following={followingQuery.data} recommended={recommendedQuery.data} />
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="ghost">
              <ArrowLeftToLine className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col px-0" side="left">
            <Sidebar following={followingQuery.data} recommended={recommendedQuery.data} />
          </SheetContent>
        </Sheet>
        {children}
      </div>
    </div>
  );
}
