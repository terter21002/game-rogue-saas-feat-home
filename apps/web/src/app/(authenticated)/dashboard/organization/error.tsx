'use client';

import { Button } from '@ui/components/nextui/button';
import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DashboardPageWrapperComponent title="Error">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="text-xl font-bold">Something went wrong!</div>
        <div className="text-lg">{error.message}</div>
        <Button
          color="warning"
          onClick={() => {
            reset();
          }}
        >
          Try again
        </Button>
      </div>
    </DashboardPageWrapperComponent>
  );
}
