import { makeStrings } from '@monoid-dev/use-strings';
import { useRouter } from 'next/router';

import { Card } from './Card';
import { useChain } from '@/utils/animation';

const useStrings = makeStrings({
  'en-US': {
    title: 'Product Manager',
  },
});

type Point = readonly [number, number];

const stagePoints: Point[] = [
  [18, 108],
  [42, 78],
  [68, 92],
  [96, 58],
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const mix = (from: number, to: number, t: number) => from + (to - from) * t;

const interpolatePoint = (points: Point[], t: number): Point => {
  if (t <= 0) {
    return points[0]!;
  }

  if (t >= 1) {
    return points[points.length - 1]!;
  }

  const scaled = t * (points.length - 1);
  const index = Math.floor(scaled);
  const localProgress = scaled - index;
  const from = points[index]!;
  const to = points[index + 1]!;

  return [
    mix(from[0], to[0], localProgress),
    mix(from[1], to[1], localProgress),
  ] as const;
};

export const ProductManagerCard: React.VFC = () => {
  const strings = useStrings();
  const router = useRouter();

  const chain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (frame) => Math.min(frame, 56) / 56,
    },
  ]);

  const animated = chain.currentValue;
  const pulse = (Math.sin(animated * Math.PI * 6) + 1) / 2;
  const travel = animated * (stagePoints.length - 1);
  const [markerX, markerY] = interpolatePoint(stagePoints, animated);

  const color = `rgb(${255 * (1 - animated)}, ${255 * (1 - animated)}, ${
    255 * (1 - animated)
  })`;

  const backgroundColor = `rgb(${255 * animated}, ${255 * animated}, ${
    255 * animated
  })`;

  const boardFill = `rgba(${255 * animated}, ${255 * animated}, ${
    255 * animated
  }, ${0.08 + animated * 0.24})`;

  const scale = mix(1.36, 1, animated);
  const shiftX = mix(8, 0, animated);
  const shiftY = mix(-8, 0, animated);

  return (
    <Card
      onMouseEnter={() => chain.play()}
      onMouseLeave={() => chain.reverse()}
      onClick={() => router.push('/recruit/PRODUCTMANAGER')}
      color={color}
      backgroundColor={backgroundColor}
    >
      <div className="h-full w-full flex items-end">
        <div
          className="absolute z-10 top-0 left-0 right-0 bottom-0"
          style={{
            transform: `
              scale(${scale})
              translateX(${shiftX}%)
              translateY(${shiftY}%)
            `,
          }}
        >
          <svg viewBox="0 0 120 160">
            <rect
              x={12}
              y={36}
              width={96}
              height={86}
              rx={8}
              fill={boardFill}
              stroke="currentColor"
              strokeOpacity={0.45 + animated * 0.55}
            />

            {[58, 80, 102].map((y) => (
              <line
                key={`lane-${y}`}
                x1={20}
                y1={y}
                x2={100}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.15 + animated * 0.45}
              />
            ))}

            {[34, 58, 82].map((x) => (
              <line
                key={`stage-${x}`}
                x1={x}
                y1={44}
                x2={x}
                y2={114}
                stroke="currentColor"
                strokeOpacity={0.12 + animated * 0.38}
              />
            ))}

            {[
              { x: 20, y: 44, width: 15 },
              { x: 41, y: 48, width: 17 },
              { x: 64, y: 42, width: 13 },
            ].map((card, index) => (
              <rect
                key={`card-${card.x}-${card.y}`}
                x={card.x + (1 - animated) * (6 - index * 2)}
                y={card.y - animated * 4 - pulse * (index === 1 ? 1.8 : 0.8)}
                width={card.width}
                height={8}
                rx={1.5}
                fill={boardFill}
                stroke="currentColor"
                strokeOpacity={0.25 + animated * 0.5}
              />
            ))}

            {stagePoints.slice(0, -1).map((from, index) => {
              const to = stagePoints[index + 1]!;
              const drawnProgress = clamp(travel - index);
              const drawnX = mix(from[0], to[0], drawnProgress);
              const drawnY = mix(from[1], to[1], drawnProgress);

              return (
                <g key={`segment-${from[0]}-${from[1]}`}>
                  <line
                    x1={from[0]}
                    y1={from[1]}
                    x2={to[0]}
                    y2={to[1]}
                    stroke="currentColor"
                    strokeOpacity={0.2 + animated * 0.3}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={from[0]}
                    y1={from[1]}
                    x2={drawnX}
                    y2={drawnY}
                    stroke="currentColor"
                    strokeOpacity={0.6 + animated * 0.4}
                    strokeWidth={2}
                  />
                </g>
              );
            })}

            {stagePoints.map((point, index) => {
              const focus = clamp(1 - Math.abs(travel - index));
              const visited = travel >= index ? 1 : 0;
              const radius = 2.4 + focus * 1.2 + pulse * 0.9 * focus;

              return (
                <circle
                  key={`node-${point[0]}-${point[1]}`}
                  cx={point[0]}
                  cy={point[1]}
                  r={radius}
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeOpacity={0.45 + visited * 0.55}
                  fill={visited ? 'currentColor' : 'none'}
                  fillOpacity={0.2 + visited * 0.55}
                />
              );
            })}

            <circle
              cx={markerX}
              cy={markerY}
              r={5.5 + pulse * 1.8}
              stroke="currentColor"
              strokeOpacity={0.2 + animated * 0.35}
              fill="none"
            />

            <g
              transform={`translate(${markerX} ${markerY}) rotate(${
                45 + (pulse - 0.5) * 10
              })`}
            >
              <rect
                x={-4.2}
                y={-4.2}
                width={8.4}
                height={8.4}
                rx={1.1}
                fill={boardFill}
                stroke="currentColor"
                strokeWidth={1.2}
              />
            </g>
          </svg>
        </div>

        <h2 className="absolute bottom-[2rem] z-20 text-[40px] leading-[40px] text-left">
          {strings.title}
        </h2>
      </div>
    </Card>
  );
};
