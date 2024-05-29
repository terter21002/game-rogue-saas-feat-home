'use client';

import type { ReactNode } from 'react';
import SharedNavbarComponent from '../shared/navbar';

export default function DefaultLayoutComponent({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="bg-muted/40 relative flex flex-col overflow-auto">
      <SharedNavbarComponent />
      <main className="flex flex-1 flex-col gap-4 overflow-auto">{children}</main>
    </div>
  );
}
