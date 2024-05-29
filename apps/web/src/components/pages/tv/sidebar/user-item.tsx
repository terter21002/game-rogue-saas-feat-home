'use client';

import { Button } from '@ui/components/ui/button';
import { Skeleton } from '@ui/components/ui/skeleton';
import { cn } from '@ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiveBadge } from '@/components/live-badge';
import { UserAvatar } from '@/components/user-avatar';
import { useSidebar } from '@/store/use-sidebar';

interface UserItemProps {
  username: string;
  id: string;
  imageUrl: string;
  isLive?: boolean;
}

export function UserItem({ username, imageUrl, isLive, id }: UserItemProps): JSX.Element {
  const pathname = usePathname();
  const { isExpanded } = useSidebar((state) => state);
  const href = `/tv/stream/${id}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        isExpanded ? 'justify-start' : 'justify-center',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            'flex items-center w-full gap-x-4',
            isExpanded ? 'justify-start' : 'justify-center'
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {isExpanded ? <p className="truncate">{username}</p> : null}
          {isExpanded && isLive ? <LiveBadge className="ml-auto" /> : null}
        </div>
      </Link>
    </Button>
  );
}

export function UserItemSkeleton(): JSX.Element {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
