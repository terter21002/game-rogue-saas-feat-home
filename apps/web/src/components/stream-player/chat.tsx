'use client';

import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChatCommunity } from './chat-community';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatList, ChatListSkeleton } from './chat-list';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { useDonate } from '@/store/use-donate';

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isSubscribed: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isChatSubscriberOnly: boolean;
}

export function Chat({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isSubscribed,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  isChatSubscriberOnly,
}: ChatProps): JSX.Element {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, expand } = useChatSidebar((state) => state);
  const { donate, setDonate } = useDonate();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (donate) {
      if (send) {
        send('Donated 1$');
        setDonate(false);
      }
    }
  }, [donate, send, setDonate]);

  useEffect(() => {
    if (matches) {
      expand();
    }
  }, [matches, expand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = (): void => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (val: string): void => {
    setValue(val);
  };

  return (
    <div className="bg-background flex flex-1 flex-col border-b border-l pt-0">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
            isSubscribersOnly={isChatSubscriberOnly}
            isFollowing={isFollowing}
            isSubscribed={isSubscribed}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
      )}
    </div>
  );
}

export function ChatSkeleton(): JSX.Element {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col border-2 border-b border-l pt-0">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}
