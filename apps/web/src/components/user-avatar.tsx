import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import { Skeleton } from '@ui/components/ui/skeleton';
import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { LiveBadge } from './live-badge';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'size-9',
      lg: 'size-14',
      xl: 'size-20',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
  size?: 'default' | 'lg' | 'xl';
}

export function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: UserAvatarProps): JSX.Element {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-rose-600 border border-background',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge ? (
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2">
          <LiveBadge />
        </div>
      ) : null}
    </div>
  );
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>;

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps): JSX.Element {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
}
