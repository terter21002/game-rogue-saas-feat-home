'use client';

import { Button } from '@ui/components/ui/button';
import Link from 'next/link';

export default function ErrorPage(): JSX.Element {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center space-y-4">
      <p>Something went wrong!</p>
      <Button asChild>
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  );
}
