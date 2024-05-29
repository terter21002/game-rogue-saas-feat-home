'use client';

import ThemeSwitcherComponent from '@ui/components/shared/theme-switcher';
import Image from 'next/image';
import type { ReactNode } from 'react';

export default function AuthLayoutComponent({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen w-screen lg:grid lg:grid-cols-2">
      <div className="bg-muted hidden lg:block">
        <Image
          alt="Image"
          className="size-full object-cover opacity-60 sepia-0 transition-all hover:opacity-100 hover:sepia"
          height="1080"
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width="1920"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end p-4">
          <ThemeSwitcherComponent />
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
