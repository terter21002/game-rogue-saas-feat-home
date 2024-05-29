import { Skeleton } from '@ui/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface BroadcastCardProps {
  url: string;
  createdAt: string;
}
export function BroadcastCard({ createdAt, url }: BroadcastCardProps): JSX.Element {
  return (
    <div className="h-52 w-[22rem] rounded-lg shadow-md">
      <video className="size-full rounded-lg" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full p-2">
        <p className="text-muted-foreground text-sm">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function BroadcastCardSkeleton(): JSX.Element {
  return <Skeleton className="h-52 w-[22rem] rounded-lg" />;
}
