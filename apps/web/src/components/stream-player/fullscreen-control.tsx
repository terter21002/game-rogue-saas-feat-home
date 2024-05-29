'use client';

import { Maximize, Minimize } from 'lucide-react';
import { Hint } from '../hint';

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenControl({ isFullscreen, onToggle }: FullscreenControlProps): JSX.Element {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} side="top" asChild>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="size-5" />
        </button>
      </Hint>
    </div>
  );
}
