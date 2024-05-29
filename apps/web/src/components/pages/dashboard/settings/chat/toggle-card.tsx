'use client';

import { Skeleton } from '@ui/components/ui/skeleton';
import { Switch } from '@ui/components/ui/switch';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { updateStream } from '@/actions/stream';

type FieldTypes =
  | 'isChatEnabled'
  | 'isChatDelayed'
  | 'isChatFollowersOnly'
  | 'isChatSubscriberOnly';

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}

export function ToggleCard({ field, label, value = false }: ToggleCardProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const onChange = (): void => {
    startTransition(() => {
      updateStream({ [field]: String(!value) })
        .then(() => toast.success('Chat Settings Updated!'))
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message);
          }
        });
    });
  };

  return (
    <div className="bg-muted rounded-xl p-6">
      <div className="flex items-center justify-between ">
        <p className="shrink-0 font-semibold">{label}</p>
        <div className="space-y-2">
          <Switch disabled={isPending} onCheckedChange={onChange} checked={value}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton(): JSX.Element {
  return <Skeleton className="w-full rounded-xl p-10" />;
}
