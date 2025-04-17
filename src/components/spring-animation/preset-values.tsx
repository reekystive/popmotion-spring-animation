import { cn } from '@/utils/cn';
import { FC } from 'react';

/**
 * Props for PresetValues component
 */
export interface PresetValuesProps {
  presetValues: number[];
  presetShortcuts: string[];
  targetValue: number;
  className?: string;
  onPresetClick: (value: number) => void;
}

/**
 * Component for displaying preset value buttons
 */
export const PresetValues: FC<PresetValuesProps> = ({
  presetValues,
  presetShortcuts,
  targetValue,
  onPresetClick,
  className,
}) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="text-sm font-medium">Preset values (use number keys 1-9 and 0):</div>
      <div className="flex gap-2">
        {presetValues.map((value, index) => {
          // Calculate corresponding keyboard key
          const keyText = presetShortcuts[index] ?? '?';

          return (
            <button
              key={value}
              onClick={() => onPresetClick(value)}
              className={`relative min-w-0 flex-shrink grow basis-1 cursor-pointer rounded py-1 text-sm font-medium text-nowrap transition-colors outline-none ${
                Math.round(targetValue) === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{value}</span>
              <KeyboardKey keyText={keyText} className="absolute -top-2 -right-1" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const KeyboardKey: FC<{ keyText: string; className?: string }> = ({ keyText, className }) => {
  return (
    <div className={cn('relative h-4 w-4', className)}>
      {/* Outer rounded rectangle - slightly visible at the bottom */}
      <div className="absolute inset-0 translate-y-[2px] rounded-sm bg-gray-800"></div>
      {/* Inner small rounded rectangle - main body */}
      <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-gray-700 text-[9px] font-medium text-white">
        {keyText}
      </div>
    </div>
  );
};
