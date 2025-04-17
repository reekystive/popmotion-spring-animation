import { SPRING_PARAMS } from '@/constants/spring-params.ts';
import { cn } from '@/utils/cn';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import { FC } from 'react';

/**
 * Props for SpringParameterControl component
 */
export interface SpringParameterControlProps {
  stiffness: number;
  damping: number;
  mass: number;
  className?: string;
  onStiffnessChange: (values: number[]) => void;
  onDampingChange: (values: number[]) => void;
  onMassChange: (values: number[]) => void;
}

/**
 * Component for controlling spring animation parameters
 */
export const SpringParameterControl: FC<SpringParameterControlProps> = ({
  stiffness,
  damping,
  mass,
  onStiffnessChange,
  onDampingChange,
  onMassChange,
  className,
}) => {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>Stiffness: {stiffness}</Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.STIFFNESS.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[stiffness]}
          onValueChange={onStiffnessChange}
          max={SPRING_PARAMS.STIFFNESS.MAX}
          min={SPRING_PARAMS.STIFFNESS.MIN}
          step={SPRING_PARAMS.STIFFNESS.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-4 w-4 rounded-full border border-blue-500 bg-gray-800 shadow outline-none"
            aria-label="Stiffness"
          />
        </Slider.Root>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>Damping: {damping}</Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.DAMPING.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[damping]}
          onValueChange={onDampingChange}
          max={SPRING_PARAMS.DAMPING.MAX}
          min={SPRING_PARAMS.DAMPING.MIN}
          step={SPRING_PARAMS.DAMPING.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-4 w-4 rounded-full border border-blue-500 bg-gray-800 shadow outline-none"
            aria-label="Damping"
          />
        </Slider.Root>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>Mass: {mass.toFixed(1)}</Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.MASS.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[mass]}
          onValueChange={onMassChange}
          max={SPRING_PARAMS.MASS.MAX}
          min={SPRING_PARAMS.MASS.MIN}
          step={SPRING_PARAMS.MASS.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-4 w-4 rounded-full border border-blue-500 bg-gray-800 shadow outline-none"
            aria-label="Mass"
          />
        </Slider.Root>
      </div>
    </div>
  );
};
