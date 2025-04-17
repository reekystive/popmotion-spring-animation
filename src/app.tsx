import { FC } from 'react';
import { SpringAnimationDemo } from './components/spring-animation/index';

export const App: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <SpringAnimationDemo />
    </div>
  );
};
