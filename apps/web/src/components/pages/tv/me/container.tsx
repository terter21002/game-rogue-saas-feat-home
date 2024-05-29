'use client';

import { cn } from '@ui/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return <div className={cn('flex-1 overflow-auto')}>{children}</div>;
}
