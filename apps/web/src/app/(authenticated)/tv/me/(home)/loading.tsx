import { StreamPlayerSkeleton } from '@/components/stream-player';

export default function DashboardLoading(): JSX.Element {
  return (
    <div className="size-full">
      <StreamPlayerSkeleton />
    </div>
  );
}
