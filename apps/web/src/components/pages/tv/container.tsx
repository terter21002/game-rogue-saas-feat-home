'use client';

import { cn } from '@ui/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  const { isExpanded } = useSidebar((state) => state);

  return <div className={cn('flex-1', isExpanded ? 'ml-[15rem]' : 'ml-[70px]')}>{children}</div>;
}
