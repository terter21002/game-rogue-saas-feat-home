'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/ui/tooltip';
import { List, PlusCircle, Settings } from '@repo/ui/icons';
import { ScrollShadow } from '@ui/components/nextui/scroll-shadow';
import ProfileAvatarComponent from '@ui/components/shared/profile-avatar';
import { Separator } from '@ui/components/ui/separator';
import { Spinner } from '@ui/components/ui/spinner';
import { cn } from '@ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarItemComponent from './sidebar-item';
import { SiteDefaultIcons, siteTitle } from '@/config/const';
import { dashboardRoutes } from '@/config/routes';
import { useAuthOrganizations } from '@/hooks/use-organization';
import { useOrganization } from '@/store/use-organization';

export default function DashboardLayoutSidebarComponent(): JSX.Element {
  const pathname = usePathname();
  const { data, isPending, error } = useAuthOrganizations();
  const { currentOrganization } = useOrganization();
  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <Link
          className="text-primary-foreground group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold sm:hidden md:size-8 md:text-base"
          href="#"
        >
          <SiteDefaultIcons />
          <span className="sr-only">{siteTitle}</span>
        </Link>
        {dashboardRoutes.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                className={cn(
                  'flex items-center justify-center transition-colors rounded-lg h-9 w-9 hover:text-foreground md:h-8 md:w-8',
                  {
                    'text-muted-foreground': !pathname.startsWith(item.href),
                    'text-primary': pathname.startsWith(item.href),
                  }
                )}
                href={item.href}
              >
                {item.component}
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
        <Separator orientation="horizontal" />
      </nav>
      <nav className="flex-1"></nav>
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <Separator orientation="horizontal" />
        <SidebarItemComponent
          title="New Organization"
          href="/dashboard/organization/new"
          isActive={pathname.startsWith('/dashboard/organization/new')}
          icon={<PlusCircle className="size-5" />}
        />
        <ScrollShadow className="max-h-[250px] p-1" hideScrollBar>
          {isPending ? (
            <Spinner />
          ) : error ? (
            <span>{error.message}</span>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {data.data.map((item) => (
                <SidebarItemComponent
                  key={item._id}
                  title={item.name}
                  href={`/dashboard/organization/${item._id}`}
                  icon={
                    <ProfileAvatarComponent
                      src={item.image}
                      color="primary"
                      isBordered={currentOrganization?._id === item._id}
                      name={item.name}
                      size="sm"
                      radius="full"
                    />
                  }
                />
              ))}
            </div>
          )}
        </ScrollShadow>
        <SidebarItemComponent
          title="View Organizations"
          href="/dashboard/organization/"
          isActive={pathname === '/dashboard/organization'}
          icon={<List className="size-5" />}
        />
        <SidebarItemComponent
          title="Settings"
          href="/dashboard/settings"
          isActive={pathname.startsWith('/dashboard/settings')}
          icon={<Settings className="size-5" />}
        />
      </nav>
    </aside>
  );
}
