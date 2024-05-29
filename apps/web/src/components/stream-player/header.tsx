'use client';

import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { Skeleton } from '@ui/components/ui/skeleton';
import { UserIcon } from 'lucide-react';
import { UserAvatar, UserAvatarSkeleton } from '../user-avatar';
import { VerifiedMark } from '../verified-mark';
import { Actions, ActionsSkeleton } from './actions';

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  isSubscribed: boolean;
  name: string;
}

export function Header({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  isSubscribed,
  name,
}: HeaderProps): JSX.Element {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = Boolean(participant);
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar imageUrl={imageUrl} username={hostName} size="lg" isLive={isLive} showBadge />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="items-cneter flex gap-x-1 text-xs font-semibold text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount} {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground text-xs font-semibold">Offline</p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        isSubscribed={isSubscribed}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
}

export function HeaderSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
}
