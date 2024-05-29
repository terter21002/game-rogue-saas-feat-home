import { cn } from '@ui/lib/utils';

interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps): JSX.Element {
  return (
    <div
      className={cn(
        'bg-rose-500 text-center text-[10px] p--[1px] px-1.5 rounded-md uppercase border border-background font-semibold tracking-wide',
        className
      )}
    >
      Live
    </div>
  );
}
