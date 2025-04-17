export const SPRING_PARAMS = {
  STIFFNESS: {
    MIN: 10,
    MAX: 1000,
    DEFAULT: 100,
    STEP: 1,
    DESCRIPTION: 'Spring stiffness, affects animation speed and elasticity',
  },
  DAMPING: {
    MIN: 1,
    MAX: 100,
    DEFAULT: 10,
    STEP: 1,
    DESCRIPTION: 'Damping coefficient, controls spring deceleration',
  },
  MASS: {
    MIN: 0.1,
    MAX: 10,
    DEFAULT: 1.0,
    STEP: 0.1,
    DESCRIPTION: 'Object mass, affects animation inertia',
  },
};
