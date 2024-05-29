import { Info } from 'lucide-react';
import { useMemo } from 'react';
import { Hint } from '../hint';

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
  isSubscribersOnly: boolean;
}

export function ChatInfo({
  isDelayed,
  isFollowersOnly,
  isSubscribersOnly,
}: ChatInfoProps): JSX.Element {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Only Followers can chat!';
    } else if (isDelayed && !isFollowersOnly) {
      return 'Messages are delayed by 3 seconds!';
    } else if (isDelayed && isFollowersOnly) {
      return 'Only Followers can chat & Messages are delayed by 3 seconds!';
    } else if (isSubscribersOnly && !isDelayed) {
      return 'Only Subscribers can chat!';
    } else if (isDelayed && !isSubscribersOnly) {
      return 'Messages are delayed by 3 seconds!';
    } else if (isDelayed && isSubscribersOnly) {
      return 'Only Subscribers can chat & Messages are delayed by 3 seconds!';
    }
    return '';
  }, [isDelayed, isFollowersOnly, isSubscribersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers Only!';
    } else if (isDelayed && !isFollowersOnly) {
      return 'Slow Mode!';
    } else if (isDelayed && isFollowersOnly) {
      return 'Followers Only & Slow Mode!';
    } else if (isSubscribersOnly && !isDelayed) {
      return 'Subscribers Only!';
    } else if (isDelayed && !isSubscribersOnly) {
      return 'Slow Mode!';
    } else if (isDelayed && isSubscribersOnly) {
      return 'Subscribers Only & Slow Mode!';
    }

    return '';
  }, [isDelayed, isFollowersOnly, isSubscribersOnly]);

  if (!isDelayed && !isFollowersOnly && !isSubscribersOnly) {
    return <>{null}</>;
  }

  return (
    <div className="text-muted-foreground flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2">
      <Hint side="left" label={hint}>
        <Info className="size-4 text-primary" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
}
