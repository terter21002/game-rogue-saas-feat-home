'use client';

import { Button } from '@ui/components/ui/button';
import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  value?: string;
}

export function CopyButton({ value }: CopyButtonProps): JSX.Element {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopy = (): void => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button disabled={!value || isCopied} onClick={onCopy} variant="ghost" size="sm">
      <Icon className="size-4 text-primary" />
    </Button>
  );
}
