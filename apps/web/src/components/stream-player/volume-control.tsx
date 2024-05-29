'use client';

import { Slider } from '@ui/components/ui/slider';
import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { Hint } from '../hint';

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export function VolumeControl({ onToggle, onChange, value }: VolumeControlProps): JSX.Element {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? 'Unmute' : 'Mute';

  const handleChange = (val: number[]): void => {
    onChange(val[0]);
  };

  return (
    <div className="flex items-center gap-2 ">
      <Hint label={label} side="top" asChild>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="size-6" />
        </button>
      </Hint>
      <Slider
        className="w-32 cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
}
