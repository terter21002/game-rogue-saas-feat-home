'use client';

import ThemeSwitcher from '@repo/ui/components/shared/theme-switcher';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/ui/sheet';
import { Menu, Search } from '@repo/ui/icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserDropdownComponent from '@/components/layout/common/user-dropdown';
import { SiteDefaultIcons, siteTitle } from '@/config/const';
import { siteRoutes } from '@/config/routes';

export default function DefaultLayoutNavbarComponent(): JSX.Element {
  const { data: session } = useSession();
  return (
    <header className="!border-border bg-background sticky top-0 z-50 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <SiteDefaultIcons />
          <span className="sr-only">{siteTitle}</span>
        </Link>
        {session?.user
          ? siteRoutes.map((route) => (
              <Link
                className="text-muted-foreground active:text-foreground hover:text-foreground transition-colors"
                href={route.href}
                key={route.href}
              >
                {route.title}
              </Link>
            ))
          : null}
      </nav>
      {session?.user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="outline">
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <SiteDefaultIcons />
                <span className="sr-only">{siteTitle}</span>
              </Link>
              {siteRoutes.map((route) => (
                <Link
                  className="active:text-muted-foreground hover:text-foreground"
                  href={route.href}
                  key={route.href}
                >
                  {route.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      ) : null}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
        <ThemeSwitcher />
        <UserDropdownComponent />
      </div>
    </header>
  );
}
