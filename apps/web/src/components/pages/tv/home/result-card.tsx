import type { TUser } from '@repo/types/user';
import { Skeleton } from '@ui/components/ui/skeleton';
import Link from 'next/link';
import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';

interface ResultCardProps {
  data: {
    user: TUser;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | undefined;
  };
}

export function ResultCard({ data }: ResultCardProps): JSX.Element {
  return (
    <Link href={`/tv/stream/${data.user._id}`}>
      <div className="size-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl ?? ''}
          fallback={data.user.image ?? ''}
          isLive={data.isLive}
          username={data.user.name}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.name}
            imageUrl={data.user.image ?? ''}
            isLive={data.isLive}
          />
          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold hover:text-primary">{data.name}</p>
            <p className="text-muted-foreground">{data.user.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ResultCardSkeleton(): JSX.Element {
  return (
    <div className="size-full ">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
