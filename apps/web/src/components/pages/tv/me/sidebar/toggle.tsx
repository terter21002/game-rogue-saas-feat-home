'use client';

import { Button } from '@ui/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';

export function Toggle(): JSX.Element {
  const { isExpanded, collapse, expand } = useDashboardSidebar((state) => state);

  const label = isExpanded ? 'Collapse' : 'Expand';

  return (
    <>
      {isExpanded ? (
        <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button onClick={collapse} variant="ghost" className="ml-auto h-auto p-2">
              <ArrowLeftFromLine className="size-4 text-primary" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={expand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="size-4 text-primary" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}
