'use client';

import { cn, stringToColor } from '@ui/lib/utils';
import { useTransition } from 'react';

interface CommunityItemProps {
  hostName: string;
  participantName?: string;
  viewerName: string;
  participantIdentity: string;
}

export function CommunityItem({ participantName }: CommunityItemProps): JSX.Element {
  const color = stringToColor(participantName || '');
  // const isSelf = participantName === viewerName;
  // const isHost = viewerName === hostName;

  const [isPending, _] = useTransition();

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color }}>{participantName}</p>
    </div>
  );
}
