import { ArrowLeftToLine } from '@repo/ui/icons';
import { Button } from '@ui/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/components/ui/sheet';
import type { ReactNode } from 'react';
import SettingLayoutSidebarComponent from './sidebar';

export default function SettingsLayoutComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="grid size-full flex-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <SettingLayoutSidebarComponent />
      </div>
      <div className="relative flex flex-col gap-2 p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="ghost">
              <ArrowLeftToLine className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col px-0" side="left">
            <SettingLayoutSidebarComponent />
          </SheetContent>
        </Sheet>
        {children}
      </div>
    </div>
  );
}
