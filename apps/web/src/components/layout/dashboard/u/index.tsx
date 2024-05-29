'use client';

import { Tab, Tabs } from '@ui/components/nextui/tabs';
import { cn } from '@ui/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export default function DashboardULayoutComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
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
        <Tab key="/tv/me" title="Stream" />
        <Tab key="/tv/me/broadcast" title="Broadcasts" />
      </Tabs>
      {children}
    </div>
  );
}
