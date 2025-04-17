import { animate } from 'popmotion';
import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimationVisualization } from './animation-visualization';
import { HelpText } from './help-text';
import { PresetValues } from './preset-values';
import { SpringParameterControl } from './spring-parameter-control';
import { TargetValueSelector } from './target-value-selector';
import { AnimationControls } from './types';

/**
 * Main component for Spring Animation Demo
 * Showcases physical spring animations with adjustable parameters
 */
export const SpringAnimationDemo: FC = () => {
  // Spring parameters
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);

  // Animation values
  const [targetValue, setTargetValue] = useState(50);
  const [currentValue, setCurrentValue] = useState(50);

  // Preset values array - ten evenly distributed values
  const presetValues: number[] = useMemo(() => [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], []);
  const presetShortcuts: string[] = useMemo(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'], []);

  // Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationControls | null>(null);
  const latestParamsRef = useRef({ stiffness, damping, mass });

  // Update latest parameter reference
  useEffect(() => {
    latestParamsRef.current = { stiffness, damping, mass };
  }, [stiffness, damping, mass]);

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
  const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const trackWidth = rect.width;

      // Calculate value (0-100) corresponding to click position
      const newValue = Math.max(0, Math.min(100, (clickX / trackWidth) * 100));
      setTargetValue(newValue);
    }
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
      // Use latest parameters from ref for dynamic updates
      stiffness: latestParamsRef.current.stiffness,
      damping: latestParamsRef.current.damping,
      mass: latestParamsRef.current.mass,
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
  }, [currentValue, targetValue]); // Only recreate animation when target value changes

  // Handle slider value change
  const handleStiffnessChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setStiffness(values[0]);
    }
  };

  const handleDampingChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setDamping(values[0]);
    }
  };

  const handleMassChange = (values: number[]) => {
    if (values[0] !== undefined) {
      setMass(values[0]);
    }
  };

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
        <AnimationVisualization currentValue={currentValue} targetValue={targetValue} />

        {/* Preset target values */}
        <PresetValues
          presetValues={presetValues}
          presetShortcuts={presetShortcuts}
          targetValue={targetValue}
          onPresetClick={handlePresetClick}
        />

        {/* Real-time data input area */}
        <TargetValueSelector
          targetValue={targetValue}
          currentValue={currentValue}
          presetValues={presetValues}
          trackRef={trackRef}
          onTrackClick={handleTrackClick}
        />

        <HelpText />
      </div>
    </div>
  );
};
