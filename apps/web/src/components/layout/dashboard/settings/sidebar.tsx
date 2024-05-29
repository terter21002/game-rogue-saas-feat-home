'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Bell, Settings } from '@repo/ui/icons';
import { cn } from '@ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { settingsRoutes } from '@/config/routes';

export default function SettingLayoutSidebarComponent(): ReactElement {
  const pathname = usePathname();
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="bg-background flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link className="text-muted-foreground flex items-center gap-2 font-semibold" href="/">
          <Settings />
          <span className="">Settings</span>
        </Link>
        <Button className="ml-auto size-8" size="icon" variant="outline">
          <Bell className="size-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {settingsRoutes.map((item) => (
            <Link
              className={cn(
                'flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-foreground',
                {
                  'text-muted-foreground/80': !pathname.startsWith(item.href),
                  'text-primary': pathname.startsWith(item.href),
                }
              )}
              href={item.href}
              key={item.href}
            >
              {item.component}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
