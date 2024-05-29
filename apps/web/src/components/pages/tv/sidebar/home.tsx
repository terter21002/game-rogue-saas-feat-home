'user client';

import { Button } from '@ui/components/ui/button';
import { cn } from '@ui/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Hint } from '@/components/hint';
import { useSidebar } from '@/store/use-sidebar';

export function HomeButton(): JSX.Element {
  const { isExpanded } = useSidebar((state) => state);
  return (
    <div className="my-2 flex items-center justify-center px-2">
      <Hint label={'Home'} side="top" asChild>
        <Button className="h-12 w-full px-2" asChild>
          <Link href={`/tv/me`}>
            <Home className={cn('size-5', isExpanded && 'lg:mr-2')} />
            {isExpanded && <span className="hidden lg:block">Home</span>}
          </Link>
        </Button>
      </Hint>
    </div>
  );
}
