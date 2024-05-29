'use client';

import { Button } from '@ui/components/ui/button';
import { Skeleton } from '@ui/components/ui/skeleton';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';
import { useSidebar } from '@/store/use-sidebar';

export function Toggle(): JSX.Element {
  const { isExpanded, expand, collapse } = useSidebar((state) => state);

  const label = isExpanded ? 'Collapse' : 'Expand';

  return (
    <div>
      {isExpanded ? (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">For You</p>
          <Hint label={label} side="right" asChild>
            <Button onClick={collapse} variant="ghost" className="ml-auto h-auto p-2">
              <ArrowLeftFromLine className="size-4 text-primary" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint side="right" label={label} asChild>
            <Button onClick={expand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="size-4 text-primary" />
            </Button>
          </Hint>
        </div>
      )}
    </div>
  );
}

export function ToggleSkeleton(): JSX.Element {
  return (
    <div className="jusitfy-between mb-3 hidden w-full items-center p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="ml-auto size-6" />
    </div>
  );
}
