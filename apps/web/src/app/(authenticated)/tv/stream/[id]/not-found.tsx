import { Button } from '@ui/components/ui/button';
import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the user you were looking for.</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  );
}
