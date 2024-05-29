import { Check } from 'lucide-react';

export function VerifiedMark(): JSX.Element {
  return (
    <div className="flex size-4 items-center justify-center rounded-full bg-blue-600 p-0.5">
      <Check className="size-[10px] stroke-[4px] text-primary" />
    </div>
  );
}
