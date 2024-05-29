'use client';

import { cn } from '@ui/lib/utils';

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps): JSX.Element {
  return <aside className={cn('flex flex-col h-full w-full bg-background')}>{children}</aside>;
}
