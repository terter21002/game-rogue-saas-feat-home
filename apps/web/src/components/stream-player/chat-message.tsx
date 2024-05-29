'use client';

import type { ReceivedChatMessage } from '@livekit/components-react';
import { stringToColor } from '@ui/lib/utils';
import { format } from 'date-fns';

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export function ChatMessage({ data }: ChatMessageProps): JSX.Element {
  const color = stringToColor(data.from?.name || '');

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="text-sm text-white/40">{format(data.timestamp, 'hh:mm')}</p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color }}>
            {data.from?.name}:
          </span>
        </p>
        <p className="break-all text-sm">{data.message}</p>
      </div>
    </div>
  );
}
