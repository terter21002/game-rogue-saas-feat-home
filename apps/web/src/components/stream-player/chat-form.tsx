/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client';

// import { DonateForm } from "../donate-form";
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Skeleton } from '@ui/components/ui/skeleton';
import { cn } from '@ui/lib/utils';
import { useState } from 'react';
import { DonateForm } from '../donate-form';
import { ChatInfo } from './chat-info';

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isSubscribersOnly: boolean;
  isFollowing: boolean;
  isSubscribed: boolean;
  isDelayed: boolean;
}

export function ChatForm({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isSubscribersOnly,
  isFollowing,
  isDelayed,
  isSubscribed,
}: ChatFormProps): JSX.Element {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isSubscribersOnlyAndNotSubscribed = isSubscribersOnly && !isSubscribed;

  const isDisabled =
    isHidden ||
    isDelayBlocked ||
    isFollowersOnlyAndNotFollowing ||
    isSubscribersOnlyAndNotSubscribed;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return <>{null}</>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnly}
          isSubscribersOnly={isSubscribersOnly}
        />
        <Input
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            'border-white/10',
            isFollowersOnly && 'rounded-t-none border-t-0',
            isSubscribersOnly && 'rounded-t-none border-t-0'
          )}
        />
      </div>
      <div className="ml-auto">
        <DonateForm disabled={isDisabled} />
        <Button
          type="submit"
          // variant="primary"
          size="sm"
          disabled={isDisabled}
          className="ml-2"
        >
          Chat
        </Button>
      </div>
    </form>
  );
}

export function ChatFormSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="size-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}
