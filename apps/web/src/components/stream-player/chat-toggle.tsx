'use client';

import { Button } from '@ui/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '../hint';
import { useChatSidebar } from '@/store/use-chat-sidebar';

export function ChatToggle(): JSX.Element {
  const { isExpanded, expand, collapse } = useChatSidebar((state) => state);

  const Icon = isExpanded ? ArrowRightFromLine : ArrowLeftFromLine;

  const onToggle = (): void => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }
  };

  const label = isExpanded ? 'Chat Collapse' : 'Chat Expand';

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto bg-transparent p-2 hover:bg-white/20 hover:text-primary"
      >
        <Icon className="size-5 text-primary" />
      </Button>
    </Hint>
  );
}
