import { StreamPlayerSkeleton } from '@/components/stream-player';

export default function UserLoading(): JSX.Element {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
}
