import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/components/ui/tooltip';
import { Settings } from '@ui/icons';
import { cn } from '@ui/lib/utils';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface SidebarItemComponentProps {
  href?: string;
  icon?: ReactNode;
  title: string;
  isActive?: boolean;
}

export default function SidebarItemComponent(props: SidebarItemComponentProps): JSX.Element {
  const { href, icon, isActive, title } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            'flex items-center justify-center transition-colors rounded-full h-9 w-9 hover:text-foreground md:h-8 md:w-8',
            {
              'text-muted-foreground': !isActive,
              'text-primary bg-primary/20': isActive,
            }
          )}
          href={href ?? '#'}
        >
          {icon ?? <Settings className="size-5" />}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}
