import { cn } from '@/utils/cn';
import * as Label from '@radix-ui/react-label';
import { FC, MouseEvent, RefObject } from 'react';

/**
 * Props for TargetValueSelector component
 */
export interface TargetValueSelectorProps {
  targetValue: number;
  currentValue: number;
  presetValues: number[];
  trackRef: RefObject<HTMLDivElement | null>;
  className?: string;
  onTrackClick: (e: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Component for selecting target values using interactive area
 */
export const TargetValueSelector: FC<TargetValueSelectorProps> = ({
  targetValue,
  currentValue: _currentValue,
  presetValues,
  trackRef,
  onTrackClick,
  className,
}) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Label.Root className="block text-sm font-medium">Click the area below to set target value:</Label.Root>
      <div ref={trackRef} onClick={onTrackClick} className="h-8 w-full cursor-pointer rounded-md bg-gray-700 p-1">
        <div className="relative h-full w-full">
          {/* Progress background */}
          <div className="h-full w-full rounded bg-gray-600" />

          {/* Target value marker */}
          <div
            className="absolute top-0 h-full w-0.5 -translate-x-1/2 bg-blue-600"
            style={{ left: `${targetValue}%` }}
          />

          {/* Scale markers */}
          {presetValues.map((mark) => (
            <div
              key={mark}
              className="absolute top-0 h-full w-px bg-gray-400 opacity-50"
              style={{ left: `${mark}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
