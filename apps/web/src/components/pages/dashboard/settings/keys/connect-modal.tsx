'use client';

import { Alert, AlertDescription, AlertTitle } from '@ui/components/ui/alert';
import { Button } from '@ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import type { ElementRef } from 'react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { createIngress } from '@/actions/ingress';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP;

export function ConnectModal(): JSX.Element {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = (): void => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('Ingress created successfully!');
          closeRef.current?.click();
        })
        .catch((e) => {
          toast.error(e.message || 'Something went wrong!');
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          disabled={isPending}
          onValueChange={(value) => {
            setIngressType(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="size-4 text-rose-500" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all Streams using the current connection.
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
