import { useEffect, useState } from 'react';

export function Transition({
  isVisible,
  children,
  exitPose = 'exit',
  enterPose = 'enter'
}) {
  const [shouldRender, should] = useState(isVisible);
  const show = () => should(true);
  const hide = () => should(false);

  useEffect(
    () => {
      if (isVisible && !shouldRender) show();
    },
    [isVisible]
  );

  return shouldRender
    ? children({
        hide,
        poseProps: {
          initialPose: exitPose,
          pose: isVisible ? enterPose : exitPose,
          onPoseComplete: pose => {
            if (pose === exitPose) {
              hide();
            }
          }
        }
      })
    : null;
}
