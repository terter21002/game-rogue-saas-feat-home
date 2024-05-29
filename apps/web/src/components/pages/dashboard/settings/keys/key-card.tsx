'use client';

import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { useState } from 'react';
import { CopyButton } from './copy-button';

interface KeyCardProps {
  value: string | null;
}

export function KeyCard({ value }: KeyCardProps): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="bg-muted rounded-xl p-6">
      <div className="flex items-start gap-x-10">
        <p className="shrink-0 font-semibold">Stream Key</p>
        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value || ''} />
          </div>
          <Button
            onClick={() => {
              setShow(!show);
            }}
            size="sm"
            variant="link"
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
}
