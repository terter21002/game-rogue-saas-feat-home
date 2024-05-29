'use client';

import React from 'react';
import type { NextUIProviderProps } from '@nextui-org/system';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

interface ProvidersProps {
  children: React.ReactNode;
  nextuiProps?: Partial<NextUIProviderProps>;
  nextThemesProps?: Partial<ThemeProviderProps>;
}

export function NextThemeProvider({
  children,
  nextThemesProps,
  nextuiProps,
}: ProvidersProps): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" {...nextThemesProps}>
      <NextUIProvider {...nextuiProps}>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
