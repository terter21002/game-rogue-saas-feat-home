'use client';

import { Tab, Tabs } from '@ui/components/nextui/tabs';
import { cn } from '@ui/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export default function TabsWrapper({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  return (
    <div className={cn('flex w-full overflow-auto flex-1 relative')}>
      <Tabs
        onSelectionChange={(key) => {
          router.push(key.toString());
        }}
        aria-label="Stream tabs"
        className="absolute left-1 top-1 z-50"
        selectedKey={pathname}
      >
        <Tab key={`/tv/stream/${params.id}`} title="Stream" />
        <Tab key={`/tv/stream/${params.id}/broadcast`} title="Broadcasts" />
      </Tabs>
      {children}
    </div>
  );
}
