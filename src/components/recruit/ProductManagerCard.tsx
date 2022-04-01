import { useRef } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';
import { useChain } from '@/utils/animation';
import { getPointPath } from '@/utils/svg';

const useStrings = makeStrings({
  'en-US': {
    title: 'Product Manager',
  },
});

type Point = readonly [number, number];

export const ProductManagerCard: React.VFC = () => {
  const strings = useStrings();

  const actionRef = useRef('enter');

  const interpolate1 = (frame: number) =>
    Math.sin(((Math.PI / 2) * frame) / 15);

  const scaleChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: interpolate1,
    },
  ]);

  const lineChain = useChain([
    {
      from: 0,
      to: 0,
      interpolate: interpolate1,
    },
    {
      from: 0,
      to: 1,
      interpolate: interpolate1,
    },
    {
      from: 1,
      to: 0,
      interpolate: interpolate1,
    },
    {
      from: 0,
      to: 1,
      interpolate: interpolate1,
    },
    {
      from: 1,
      to: 0,
      interpolate: interpolate1,
    },
  ]);

  const faceChain = useChain([
    {
      from: 0,
      to: 0,
      interpolate: (f) => f / 15,
    },
    {
      from: 0,
      to: 1,
      interpolate: interpolate1,
    },
  ]);

  const color = `rgb(${255 * (1 - faceChain.currentValue)}, ${
    255 * (1 - faceChain.currentValue)
  }, ${255 * (1 - faceChain.currentValue)})`;

  const backgroundColor = `rgb(${255 * faceChain.currentValue}, ${
    255 * faceChain.currentValue
  }, ${255 * faceChain.currentValue})`;

  const scale = 1 + (1.9 - 1) * (1 - scaleChain.currentValue);

  const renderCross = (point: Point) => {
    const size = 5;
    const [x, y] = point;

    return (
      <>
        <line
          x1={x - size / 2}
          y1={y - size / 2}
          x2={x + size / 2}
          y2={y + size / 2}
          stroke="currentColor"
          strokeWidth={1 / scale}
        />
        <line
          x1={x - size / 2}
          y1={y + size / 2}
          x2={x + size / 2}
          y2={y - size / 2}
          stroke="currentColor"
          strokeWidth={1 / scale}
        />
      </>
    );
  };

  const renderLine = (p1: Point, p2: Point) => {
    return (
      <line
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke="currentColor"
        strokeOpacity={lineChain.currentValue}
        strokeDasharray="2 2"
        strokeWidth={0.5 / scale}
      />
    );
  };

  const renderFace = (
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point,
    deltaY: number,
  ) => {
    return (
      <polygon
        points={getPointPath(p1, p2, p3, p4)}
        transform={`
          translate(0 ${deltaY})
        `}
        strokeOpacity={faceChain.currentValue}
        stroke="currentColor"
        fill="none"
      />
    );
  };

  const a1 = [80, 31] as const;
  const a2 = [88, 53] as const;
  const a4 = [32, 46] as const;
  const a3 = [a4[0] + a2[0] - a1[0], a4[1] + a2[1] - a1[1]] as const;

  const h = 40;
  const b1 = [a1[0], a1[1] + h] as const;
  const b2 = [a2[0], a2[1] + h] as const;
  const b3 = [a3[0], a3[1] + h] as const;
  const b4 = [a4[0], a4[1] + h] as const;

  return (
    <Card
      onMouseEnter={async () => {
        actionRef.current = 'enter';
        await scaleChain.play();
        if (actionRef.current === 'enter') {
          await lineChain.play();
        }
        if (actionRef.current === 'enter') {
          await faceChain.play();
        }
      }}
      onMouseLeave={async () => {
        actionRef.current = 'leave';
        await faceChain.reverse();
        if (actionRef.current === 'leave') {
          await scaleChain.reverse();
        }
      }}
      onClick={() =>
        window.open(
          `mailto:ymao@monoidtech.com?subject=${encodeURI(
            'Apply for Product Manager',
          )}`,
        )
      }
      color={color}
      backgroundColor={backgroundColor}
    >
      <div className="h-full w-full flex items-end">
        <div
          className="absolute z-10 top-0 left-0 right-0 bottom-0"
          style={{
            transform: `
              scale(${scale})
              translateX(${8 * (1 - scaleChain.currentValue)}%)
              translateY(${0 * (1 - scaleChain.currentValue)}%)
            `,
          }}
        >
          <svg viewBox="0 0 120 160">
            {renderCross(a1)}
            {renderCross(a2)}
            {renderCross(a4)}
            {renderCross(a3)}
            {renderCross(b1)}
            {renderCross(b2)}
            {renderCross(b3)}
            {renderCross(b4)}

            {renderLine(a4, a1)}
            {renderLine(a1, a2)}
            {renderLine(a3, a2)}
            {renderLine(a4, a3)}

            {renderLine(a1, b1)}
            {renderLine(a2, b2)}
            {renderLine(a3, b3)}
            {renderLine(a4, b4)}

            {renderLine(b4, b1)}
            {renderLine(b1, b2)}
            {renderLine(b3, b2)}
            {renderLine(b4, b3)}

            {renderFace(a1, a2, b2, b1, -50 * (1 - faceChain.currentValue))}
            {renderFace(a1, b1, b3, a3, 50 * (1 - faceChain.currentValue))}
            {renderFace(a4, a3, b3, b4, -50 * (1 - faceChain.currentValue))}
          </svg>
        </div>

        <h2 className="absolute bottom-[2rem] z-20 text-[60px] leading-[50px] text-left">
          {strings.title}
        </h2>
      </div>
    </Card>
  );
};
