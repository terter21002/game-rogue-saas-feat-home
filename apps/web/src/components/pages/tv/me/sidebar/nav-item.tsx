import { Button } from '@ui/components/ui/button';
import { Skeleton } from '@ui/components/ui/skeleton';
import { cn } from '@ui/lib/utils';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';

interface NavItemProps {
  label: string;
  href: string;
  Icon: LucideIcon;
  isActive: boolean;
}
export function NavItem({ label, href, Icon, isActive }: NavItemProps): JSX.Element {
  const { isExpanded } = useDashboardSidebar((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        isExpanded ? 'justify-start' : 'justify-center',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('h-4 w-4 text-primary', isExpanded ? 'mr-2' : 'mr-0')} />
          {isExpanded ? <span>{label}</span> : null}
        </div>
      </Link>
    </Button>
  );
}

export function NavItemsSkeleton(): JSX.Element {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
