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
import CheckoutPage from './checkout';

export function CheckoutForm({ disabled }: { disabled: boolean }): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled}>
        <Button disabled={disabled} size="sm">
          subscribe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogDescription>
            subscribe to user to get benefits. <b className="text-lg font-bold">$2.99/mon</b>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 p-2">
          <CheckoutPage />
        </div>
      </DialogContent>
    </Dialog>
  );
}
