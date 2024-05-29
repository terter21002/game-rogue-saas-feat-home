'use client';

import ThemeSwitcherComponent from '@repo/ui/components/shared/theme-switcher';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/ui/sheet';
import { Menu, Search } from '@repo/ui/icons';
import Link from 'next/link';
import UserDropdownComponent from '@/components/layout/common/user-dropdown';
import { SiteDefaultIcons, siteTitle } from '@/config/const';
import { siteRoutes } from '@/config/routes';

export default function AdminLayoutNavbarComponent(): JSX.Element {
  return (
    <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col" side="left">
          <nav className="grid gap-2 text-lg font-medium">
            <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
              <SiteDefaultIcons />
              <span className="sr-only">{siteTitle}</span>
            </Link>
            {siteRoutes.map((item) => (
              <Link
                className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                href={item.href}
                key={item.href}
              >
                {item.component}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
            <Input
              className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
      </div>
      <ThemeSwitcherComponent />
      <UserDropdownComponent />
    </header>
  );
}
