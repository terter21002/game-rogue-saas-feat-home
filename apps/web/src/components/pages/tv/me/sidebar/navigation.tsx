'use client';

import { Fullscreen, Video } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem, NavItemsSkeleton } from './nav-item';
import { useProfile } from '@/hooks/use-profile';

export function Navigation(): JSX.Element {
  const pathname = usePathname();
  const { data: user } = useProfile();
  const routes = [
    {
      label: 'Stream',
      href: `/tv/me`,
      icon: Fullscreen,
    },
    {
      label: 'Broadcasts',
      href: `/tv/me/broadcast`,
      icon: Video,
    },
  ];

  if (!user?._id) {
    return (
      <ul className="space-y-2">
        {[1, 2, 3, 4].map((_) => (
          <NavItemsSkeleton key={_} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          Icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
}
