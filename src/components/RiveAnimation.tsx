
import React from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

interface RiveAnimationProps {
  src: string;
  stateMachine?: string;
  className?: string;
  height?: number | string;
  width?: number | string;
  autoplay?: boolean;
}

const RiveAnimation: React.FC<RiveAnimationProps> = ({
  src,
  stateMachine,
  className = '',
  height = 300,
  width = '100%',
  autoplay = true
}) => {
  const { RiveComponent } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    autoplay,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div style={{ height, width }} className={className}>
      <RiveComponent />
    </div>
  );
};

export default RiveAnimation;
