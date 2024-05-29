'use client';

import { NextThemeProvider } from '@repo/ui/providers/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@ui/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }): ReactNode {
  const router = useRouter();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemeProvider
          nextuiProps={{
            navigate: router.push,
          }}
        >
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
        </NextThemeProvider>
      </QueryClientProvider>
      <ReactQueryDevtools client={queryClient} />
    </SessionProvider>
  );
}
