'use client';

import { Button } from '@ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/components/ui/dialog';
import { useEffect, useState } from 'react';
import DonatePage from './donate';
import { useDonate } from '@/store/use-donate';

export function DonateForm({ disabled }: { disabled: boolean }): JSX.Element {
  const [open, setOpen] = useState(false);
  const { donate, setDonate } = useDonate();
  useEffect(() => {
    if (donate) {
      setOpen(false);
      setDonate(false);
    }
  }, [donate, setDonate]);
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
      }}
    >
      <DialogTrigger asChild disabled={disabled}>
        <Button size="sm" disabled={disabled}>
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Donate</DialogTitle>
          <DialogDescription>
            donate to support streamer. <b className="text-lg font-bold">$1</b>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 p-2">
          <DonatePage />
        </div>
      </DialogContent>
    </Dialog>
  );
}
