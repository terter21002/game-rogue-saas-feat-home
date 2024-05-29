import { cn } from '@ui/lib/utils';
import { WifiOff } from 'lucide-react';
import Image from 'next/image';

interface OfflineVideoProps {
  username: string;
  thumbnailUrl: string | undefined;
}

export function OfflineVideo({ username, thumbnailUrl }: OfflineVideoProps): JSX.Element {
  return (
    <div className="absolute size-full">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          className="size-full object-cover opacity-30"
          alt="thumbnail"
          width={1600}
          height={1200}
        />
      )}
      <div
        className={cn(
          'relative left-0 z-10 flex w-full flex-col items-center justify-center space-y-4',
          thumbnailUrl ? 'top-[-60%]' : 'top-[40%]'
        )}
      >
        <WifiOff className="size-10 text-primary" />
        <p className="text-muted-foreground">{username} is offline.</p>
      </div>
    </div>
  );
}
