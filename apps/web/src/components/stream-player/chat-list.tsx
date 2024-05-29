'use client';

import type { ReceivedChatMessage } from '@livekit/components-react';
import { Skeleton } from '@ui/components/ui/skeleton';
import { ChatMessage } from './chat-message';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export function ChatList({ isHidden, messages }: ChatListProps): JSX.Element {
  if (isHidden || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          {isHidden ? 'Chat is Disabled!' : 'Welcome to the Chat!'}
        </p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto p-3">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
}

export function ChatListSkeleton(): JSX.Element {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}
