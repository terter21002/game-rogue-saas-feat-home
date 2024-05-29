'use client';

import { useParticipants } from '@livekit/components-react';
import { Input } from '@ui/components/ui/input';
import { ScrollArea } from '@ui/components/ui/scroll-area';
import type { LocalParticipant, RemoteParticipant } from 'livekit-client';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { CommunityItem } from './community-item';

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export function ChatCommunity({ hostName, viewerName, isHidden }: ChatCommunityProps): JSX.Element {
  const participants = useParticipants();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 700);

  const onChange = (newValue: string): void => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce<(RemoteParticipant | LocalParticipant)[]>(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }

        return acc;
      },
      []
    );

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">Community is Disabled.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Search Community..."
        className="border-white/10"
      />
      <ScrollArea className="mt-4 gap-y-2">
        <p className="text-muted-foreground hidden p-2 text-center text-sm last:block">
          No Results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
