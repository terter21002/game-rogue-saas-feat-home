'use client';

import { Button } from '@ui/components/ui/button';
import { MessagesSquare, Users } from 'lucide-react';
import { Hint } from '../hint';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

export function VariantToggle(): JSX.Element {
  const { variant, changeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessagesSquare;

  const onToggle = (): void => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

    changeVariant(newVariant);
  };

  const label = isChat ? 'Community' : 'Go Back to Chat';

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto bg-transparent p-2 hover:bg-white/20 hover:text-primary"
      >
        <Icon className="size-4 " />
      </Button>
    </Hint>
  );
}
