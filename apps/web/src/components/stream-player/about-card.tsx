'use client';

import { VerifiedMark } from '../verified-mark';

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export function AboutCard({ hostName, bio, followedByCount }: AboutCardProps): JSX.Element {
  // const hostAsViewer = `host-${hostIdentity}`;
  // const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? 'Follower' : 'Followers';

  return (
    <div className="px-4">
      <div className="bg-background group flex flex-col gap-y-3 rounded-xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
        </div>
        <div className="text-muted-foreground text-sm ">
          <span className="font-semibold text-primary">{followedByCount}</span> {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || 'This user prefers to keep an air of mystery about them.'}
        </p>
      </div>
    </div>
  );
}
