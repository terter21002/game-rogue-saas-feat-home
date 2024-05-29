import { Skeleton } from '@ui/components/ui/skeleton';
import Image from 'next/image';
import { LiveBadge } from './live-badge';
import { UserAvatar } from './user-avatar';

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

export function Thumbnail({ src, fallback, isLive, username }: ThumbnailProps): JSX.Element {
  let content;

  if (!src) {
    content = (
      <div className="flex size-full flex-col items-center justify-center gap-y-4 rounded-md bg-muted transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
        <UserAvatar size="lg" showBadge username={username} imageUrl={fallback} isLive={isLive} />
      </div>
    );
  } else {
    content = (
      <Image
        fill
        sizes="inherit"
        src={src}
        alt="Thumbnail"
        className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
      />
    );
  }

  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
      {content}
      {isLive && src ? (
        <div className="absolute left-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <LiveBadge />
        </div>
      ) : null}
    </div>
  );
}

export function ThumbnailSkeleton(): JSX.Element {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-xl">
      <Skeleton className="size-full" />
    </div>
  );
}
