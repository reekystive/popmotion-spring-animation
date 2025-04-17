import { DEFAULT_TARGET_VALUE, MAX_MARK, MIN_MARK, PRESET_SHORTCUTS, PRESET_VALUES } from '@/constants/marks.ts';
import { useThrottledUrlUpdates } from '@/hooks/use-throttled-url-updates.ts';
import { animate } from 'popmotion';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useSpringConfig } from '../../hooks/use-spring-config.ts';
import { AnimationVisualization } from './animation-visualization';
import { HelpText } from './help-text';
import { PresetValues } from './preset-values';
import { SpringParameterControl } from './spring-parameter-control';
import { TargetValueSelector } from './target-value-selector';
import { AnimationControls } from './types.ts';

/**
 * Main component for Spring Animation Demo
 * Showcases physical spring animations with adjustable parameters
 */
export const SpringAnimationDemo: FC = () => {
  const { stiffness, damping, mass, setStiffness, setDamping, setMass } = useSpringConfig();
  const { throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass } = useThrottledUrlUpdates();

  // Animation values - targetValue is not stored in URL
  const [targetValue, setTargetValue] = useState(DEFAULT_TARGET_VALUE);
  const [currentValue, setCurrentValue] = useState(DEFAULT_TARGET_VALUE);

  // Preset values array - ten evenly distributed values
  const presetValues: number[] = useMemo(() => PRESET_VALUES, []);
  const presetShortcuts: string[] = useMemo(() => PRESET_SHORTCUTS, []);

  // Refs
  const animationRef = useRef<AnimationControls | null>(null);

  // Add keyboard event listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      const key = e.key;
      if (presetShortcuts.includes(key)) {
        const index = presetShortcuts.indexOf(key);
        if (index === -1) return;
        const targetValue = presetValues[index];
        if (targetValue === undefined) return;
        setTargetValue(targetValue);
      }
    };

    // Add global keyboard event listener
    window.addEventListener('keydown', handleGlobalKeyDown);

    // Clean up when component unmounts
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [presetShortcuts, presetValues]);

  // Handle track click
  const handleTrackClick = (percentage: number) => {
    setTargetValue(percentage * (MAX_MARK - MIN_MARK) + MIN_MARK);
  };

  // Handle preset value click
  const handlePresetClick = (value: number) => {
    setTargetValue(value);
  };

  // Create new animation only when target value changes
  useEffect(() => {
    // Stop current running animation
    if (animationRef.current) {
      animationRef.current.stop();
    }

    // Create new animation
    const animation = animate({
      from: currentValue,
      to: targetValue,
      type: 'spring',
      stiffness,
      damping,
      mass,
      onUpdate: (value) => {
        setCurrentValue(value);
      },
      onComplete: () => {
        setCurrentValue(targetValue);
      },
    });

    animationRef.current = animation;

    // Clean up when component unmounts
    return () => {
      animation.stop();
    };
  }, [currentValue, damping, mass, stiffness, targetValue]); // Only recreate animation when target value changes

  // Handle slider value change
  const handleStiffnessChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setStiffness(values[0]);
      throttledUpdateStiffness(values[0]);
    }
  };

  const handleDampingChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setDamping(values[0]);
      throttledUpdateDamping(values[0]);
    }
  };

  const handleMassChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setMass(values[0]);
      throttledUpdateMass(values[0]);
    }
  };

  // Cleanup throttled functions on unmount
  useEffect(() => {
    return () => {
      throttledUpdateStiffness.cancel();
      throttledUpdateDamping.cancel();
      throttledUpdateMass.cancel();
    };
  }, [throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass]);

  // Render component
  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md">
      <h2 className="text-2xl font-bold">Popmotion Spring Animation Demo</h2>

      <div className="flex w-full flex-col gap-6 pt-6">
        {/* Spring parameter sliders */}
        <SpringParameterControl
          stiffness={stiffness}
          damping={damping}
          mass={mass}
          onStiffnessChange={handleStiffnessChange}
          onDampingChange={handleDampingChange}
          onMassChange={handleMassChange}
        />

        {/* Axis and ball visualization */}
        <div className="flex w-full flex-col">
          <div className="mb-1 flex flex-row justify-between">
            <span className="text-sm font-medium">Target value</span>
            <span className="text-sm font-medium">{targetValue.toFixed(2)}</span>
          </div>
          <AnimationVisualization value={targetValue} />

          <div className="full h-6" />

          <div className="mb-1 flex flex-row justify-between">
            <span className="text-sm font-medium">Animated value</span>
            <span className="text-sm font-medium">{currentValue.toFixed(2)}</span>
          </div>
          <AnimationVisualization value={currentValue} />
        </div>

        {/* Preset target values */}
        <PresetValues
          presetValues={presetValues}
          presetShortcuts={presetShortcuts}
          targetValue={targetValue}
          onPresetClick={handlePresetClick}
        />

        {/* Real-time data input area */}
        <TargetValueSelector onTrackClick={handleTrackClick} />

        <HelpText />
      </div>
    </div>
  );
};
