import { useRef } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';
import { useChain } from '@/utils/animation';

const useStrings = makeStrings({
  'en-US': {
    title: (
      <>
        UI/UX
        <br />
        Engineer
      </>
    ),
  },
});

export const UIUXEngineerCard: React.VFC = () => {
  const strings = useStrings();

  const interpolate1 = (frame: number) =>
    Math.sin(((Math.PI / 2) * frame) / 20);

  const scaleChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (f) => f / 30,
    },
  ]);

  const colorChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (f) => f / 30,
    },
  ]);

  const squareXChain = useChain([
    {
      from: 21,
      to: 30,
      interpolate: interpolate1,
    },
    {
      from: 30,
      to: 62,
      interpolate: interpolate1,
    },
    {
      from: 62,
      to: 35,
      interpolate: interpolate1,
    },
  ]);

  const squareYChain = useChain([
    {
      from: 100,
      to: 80,
      interpolate: interpolate1,
    },
    {
      from: 80,
      to: 80,
      interpolate: interpolate1,
    },
    {
      from: 80,
      to: 67,
      interpolate: interpolate1,
    },
  ]);

  const squareRotateChain = useChain([
    {
      from: -25,
      to: 0,
      interpolate: interpolate1,
    },
    {
      from: 0,
      to: 25,
      interpolate: interpolate1,
    },
    {
      from: 25,
      to: 0,
      interpolate: interpolate1,
    },
  ]);

  const circleXChain = useChain([
    {
      from: 55,
      to: 55,
      interpolate: interpolate1,
    },
    {
      from: 55,
      to: 50,
      interpolate: interpolate1,
    },
    {
      from: 50,
      to: 55,
      interpolate: interpolate1,
    },
  ]);

  const circleYChain = useChain([
    {
      from: 100,
      to: 80,
      interpolate: interpolate1,
    },
    {
      from: 80,
      to: 87,
      interpolate: interpolate1,
    },
  ]);

  const circleRChain = useChain([
    {
      from: 15,
      to: 15,
      interpolate: interpolate1,
    },
    {
      from: 15,
      to: 15,
      interpolate: interpolate1,
    },
    {
      from: 15,
      to: 20,
      interpolate: interpolate1,
    },
  ]);

  const rectXChain = useChain([
    {
      from: 37,
      to: 55,
      interpolate: interpolate1,
    },
    {
      from: 55,
      to: 29,
      interpolate: interpolate1,
    },
    {
      from: 29,
      to: 75,
      interpolate: interpolate1,
    },
  ]);

  const rectYChain = useChain([
    {
      from: 74,
      to: 80,
      interpolate: interpolate1,
    },
    {
      from: 80,
      to: 85,
      interpolate: interpolate1,
    },
    {
      from: 85,
      to: 50,
      interpolate: interpolate1,
    },
  ]);

  const rectRotateChain = useChain([
    {
      from: 15,
      to: 0,
      interpolate: interpolate1,
    },
    {
      from: 0,
      to: -10,
      interpolate: interpolate1,
    },
    {
      from: -10,
      to: 90,
      interpolate: interpolate1,
    },
  ]);

  const [squareX, squareY, squareRotate] = [
    squareXChain.currentValue,
    squareYChain.currentValue,
    squareRotateChain.currentValue,
  ];
  const [circleX, circleY, circleR] = [
    circleXChain.currentValue,
    circleYChain.currentValue,
    circleRChain.currentValue,
  ];
  const [rectX, rectY, rectRotate] = [
    rectXChain.currentValue,
    rectYChain.currentValue,
    rectRotateChain.currentValue,
  ];
  const colorAnimated = colorChain.currentValue;
  const rectSize = 20;

  const color = `rgb(${255 * (1 - colorAnimated)}, ${
    255 * (1 - colorAnimated)
  }, ${255 * (1 - colorAnimated)})`;

  const backgroundColor = `rgb(${255 * colorAnimated}, ${
    255 * colorAnimated
  }, ${255 * colorAnimated})`;

  const scale = 1.25 + 4.75 * (1 - scaleChain.currentValue);

  const step2Chains = [
    squareXChain,
    squareYChain,
    squareRotateChain,
    circleXChain,
    circleYChain,
    circleRChain,
    rectXChain,
    rectYChain,
    rectRotateChain,
    colorChain,
  ];

  const currentAction = useRef('enter');

  return (
    <Card
      onMouseEnter={async () => {
        currentAction.current = 'enter';
        await scaleChain.play();
        if (currentAction.current === 'enter') {
          await Promise.all(step2Chains.map((c) => c.play()));
        }
      }}
      onMouseLeave={async () => {
        currentAction.current = 'leave';
        await Promise.all(step2Chains.map((c) => c.reverse()));
        if (currentAction.current === 'leave') {
          await scaleChain.reverse();
        }
      }}
      onClick={() =>
        window.open(
          `mailto:ymao@monoidtech.com?subject=${encodeURI(
            'Apply for UI/UX Engineer',
          )}`,
        )
      }
      color={color}
      backgroundColor={backgroundColor}
    >
      <div
        className="absolute z-10 top-0 left-0 right-0 bottom-0"
        style={{
          transform: `
            translateX(${45 * (1 - scaleChain.currentValue)}%)
            translateY(${12 - 42 * (1 - scaleChain.currentValue)}%)
            scale(${scale})
          `,
        }}
      >
        <svg viewBox="0 0 110 160">
          <rect
            x={rectX}
            y={rectY}
            width={35}
            height={20}
            stroke="currentColor"
            strokeWidth={1 / scale}
            fill={backgroundColor}
            transform={`rotate(${rectRotate} ${rectX} ${rectY})`}
          />

          <circle
            cx={circleX}
            cy={circleY}
            r={circleR}
            stroke="currentColor"
            fill={backgroundColor}
            strokeWidth={1 / scale}
          />
          <rect
            x={squareX}
            y={squareY}
            height={rectSize}
            width={rectSize}
            transform={`rotate(${squareRotate} ${squareX} ${squareY})`}
            stroke="currentColor"
            fill={backgroundColor}
            strokeWidth={1 / scale}
          />
        </svg>
      </div>

      <h2 className="absolute text-[60px] leading-[50px] z-20">
        {strings.title}
      </h2>
    </Card>
  );
};
