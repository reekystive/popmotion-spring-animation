import { updateUrlParams } from '@/config/spring-url-params.ts';
import { URL_UPDATE_THROTTLE_MS } from '@/constants/throttle.ts';
import { throttle } from 'lodash-es';
import { useEffect, useMemo } from 'react';

export const useThrottledUrlUpdates = () => {
  const throttledUpdateStiffness = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ stiffness: value }), URL_UPDATE_THROTTLE_MS, {
        leading: true,
        trailing: true,
      }),
    []
  );

  const throttledUpdateDamping = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ damping: value }), URL_UPDATE_THROTTLE_MS, {
        leading: true,
        trailing: true,
      }),
    []
  );

  const throttledUpdateMass = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ mass: value }), URL_UPDATE_THROTTLE_MS, {
        leading: true,
        trailing: true,
      }),
    []
  );

  // Cleanup throttled functions on unmount
  useEffect(() => {
    return () => {
      throttledUpdateStiffness.cancel();
      throttledUpdateDamping.cancel();
      throttledUpdateMass.cancel();
    };
  }, [throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass]);

  return { throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass };
};
