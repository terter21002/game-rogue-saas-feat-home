import { Skeleton } from '@ui/components/ui/skeleton';
import { BroadcastCardSkeleton } from '@/components/pages/tv/me/broadcast/broadcast-card';

export default function ChatLoading(): JSX.Element {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-10 w-[200px]" />
      <div className="grid grid-cols-4">
        <BroadcastCardSkeleton />
      </div>
    </div>
  );
}
