import type { ReactNode } from 'react';
import SharedNavbarComponent from '../shared/navbar';
import DashboardLayoutSidebarComponent from './sidebar';

export default function DashboardLayoutComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="bg-muted/40 h-screen w-full flex-1">
      <DashboardLayoutSidebarComponent />
      <div className="relative flex h-screen flex-col overflow-auto pl-14">
        <SharedNavbarComponent />
        <main className="flex flex-1 flex-col gap-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
