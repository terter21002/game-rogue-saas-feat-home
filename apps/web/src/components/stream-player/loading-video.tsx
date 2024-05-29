import { cn } from '@ui/lib/utils';
import { Loader } from 'lucide-react';
import Image from 'next/image';

interface LoadingVideoProps {
  label: string;
  thumbnailUrl: string | undefined;
}

export function LoadingVideo({ label, thumbnailUrl }: LoadingVideoProps): JSX.Element {
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
        <Loader className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground capitalize">{label}</p>
      </div>
    </div>
  );
}
