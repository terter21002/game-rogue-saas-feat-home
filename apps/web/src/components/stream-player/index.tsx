'use client';

import { LiveKitRoom } from '@livekit/components-react';
import type { TStream, TTag, TUser } from '@repo/types';
import { cn } from '@ui/lib/utils';
import { AboutCard } from './about-card';
import { Chat, ChatSkeleton } from './chat';
import { ChatToggle } from './chat-toggle';
import { Header, HeaderSkeleton } from './header';
import { InfoCard } from './info-card';
import { Video, VideoSkeleton } from './video';
import { liveKitConfig } from '@/config/const';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { useChatSidebar } from '@/store/use-chat-sidebar';

type CustomUser = TUser & { _count: { followedBy: number } };

interface StreamPlayerProps {
  user: CustomUser;
  stream: TStream & { tags: TTag[] };
  isFollowing: boolean;
  isSubscribed: boolean;
}

export function StreamPlayer({
  user,
  stream,
  isFollowing,
  isSubscribed,
}: StreamPlayerProps): JSX.Element {
  const { token, name, identity } = useViewerToken(user._id);
  const { isExpanded } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      <StreamPlayerSkeleton /> || <div> Not allowed to watch the stream! </div>
    );
  }

  return (
    <>
      {!isExpanded && (
        <div className="fixed right-2 top-[85px] z-30 hidden lg:block">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={liveKitConfig.wsUrl}
        className={cn(
          'w-full flex flex-col lg:flex-row flex-1 overflow-auto',
          isExpanded ? '' : ''
        )}
      >
        <div className="col-span-1 flex-1 space-y-4 pb-10 lg:overflow-auto">
          <Video hostName={user.name} hostIdentity={user._id} stream={stream} />
          <Header
            hostName={user.name}
            hostIdentity={user._id}
            viewerIdentity={identity}
            imageUrl={user.image ?? ''}
            isFollowing={isFollowing}
            isSubscribed={isSubscribed}
            name={stream.name || 'No Name'}
          />
          <InfoCard
            hostIdentity={user._id}
            viewerIdentity={identity}
            name={stream.name ?? ''}
            thumbnailUrl={stream.thumbnailUrl ?? null}
            description={stream.description}
            tags={stream.tags}
          />
          <AboutCard
            hostName={user.name}
            hostIdentity={user._id}
            viewerIdentity={identity}
            bio=""
            followedByCount={user._count.followedBy}
          />
        </div>
        <div
          className={cn(
            'w-full flex flex-col h-auto lg:h-full lg:w-[300px]',
            !isExpanded && 'hidden'
          )}
        >
          <Chat
            viewerName={name}
            hostName={user.name}
            hostIdentity={user._id}
            isFollowing={isFollowing}
            isSubscribed={isSubscribed}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            isChatSubscriberOnly={stream.isChatSubscriberOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export function StreamPlayerSkeleton(): JSX.Element {
  return (
    <div className="grid size-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="bg-backgroud col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
}
