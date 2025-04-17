import { MAX_MARK, MIN_MARK } from '@/constants/marks.ts';
import { cn } from '@/utils/cn';
import { FC } from 'react';

/**
 * Props for AnimationVisualization component
 */
export interface AnimationVisualizationProps {
  value: number;
  className?: string;
}

/**
 * Component for visualizing the spring animation with a ball
 */
export const AnimationVisualization: FC<AnimationVisualizationProps> = ({ value, className }) => {
  const ballPercentage = (value - MIN_MARK) / (MAX_MARK - MIN_MARK);

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <div className="relative flex h-10 w-full items-center">
        {/* Axis */}
        <div className="absolute bottom-4 h-1 w-full rounded-full bg-gray-300">
          {/* 0-100 scale markers */}
          <div className="absolute top-1 -bottom-4 flex w-full items-center justify-between leading-3">
            <div className="text-xs">0</div>
            <div className="text-xs">100</div>
          </div>
          <div className="absolute top-0 right-1 bottom-0 left-1">
            {/* Scale lines */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
              <div
                key={mark}
                className="absolute bottom-1 h-1.5 w-0.5 -translate-x-1/2 rounded-t-full bg-gray-400"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-1 bottom-0 left-1">
          {/* Ball */}
          <div
            className="absolute top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-blue-500 shadow-lg transition-none"
            style={{ left: `${ballPercentage * 100}%` }}
          >
            <div className="absolute inset-1.5 rounded-full bg-blue-300 opacity-70 shadow-md/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
