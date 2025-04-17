import { defaultSpringParams } from '@/config/spring-schema.ts';
import { getSpringParamsFromUrlWithDefaultValues } from '@/config/spring-url-params';
import { useMemo, useState } from 'react';

export const useSpringConfig = () => {
  const initialConfig = useMemo(() => {
    try {
      return getSpringParamsFromUrlWithDefaultValues(new URL(window.location.href));
    } catch {
      return defaultSpringParams;
    }
  }, []);

  const [stiffness, setStiffness] = useState(initialConfig.stiffness);
  const [damping, setDamping] = useState(initialConfig.damping);
  const [mass, setMass] = useState(initialConfig.mass);

  return { stiffness, damping, mass, setStiffness, setDamping, setMass };
};
