'use client';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Bell } from '@repo/ui/icons';
import Link from 'next/link';
import { SiteDefaultIcons, siteTitle } from '@/config/const';
import { siteRoutes } from '@/config/routes';

export default function AdminLayoutSidebarComponent(): JSX.Element {
  return (
    <div className="bg-muted/40 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <SiteDefaultIcons />
            <span className="">{siteTitle}</span>
          </Link>
          <Button className="ml-auto size-8" size="icon" variant="outline">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {siteRoutes.map((item) => (
              <Link
                className="text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                href={item.href}
                key={item.href}
              >
                {item.component}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button className="w-full" size="sm">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
