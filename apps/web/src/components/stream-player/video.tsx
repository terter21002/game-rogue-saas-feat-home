'use client';

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { TStream } from '@repo/types';
import { Skeleton } from '@ui/components/ui/skeleton';
import { ConnectionState, Track } from 'livekit-client';
import { LiveVideo } from './live-video';
import { LoadingVideo } from './loading-video';
import { OfflineVideo } from './offline-video';

interface VideoProps {
  hostName: string;
  hostIdentity: string;
  stream: TStream;
}

export function Video({ hostName, hostIdentity, stream }: VideoProps): JSX.Element {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    (track) => track.participant.identity === hostIdentity
  );

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} thumbnailUrl={stream.thumbnailUrl} />;
  } else if (!participant && tracks.length === 0) {
    content = <LoadingVideo label={connectionState} thumbnailUrl={stream.thumbnailUrl} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="group relative aspect-video w-full border-b">{content}</div>;
}

export function VideoSkeleton(): JSX.Element {
  return (
    <div className="border-background aspect-video border-x">
      <Skeleton className="size-full rounded-none" />
    </div>
  );
}
