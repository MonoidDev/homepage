import { makeStrings } from '@monoid-dev/use-strings';
import { useRouter } from 'next/router';

import { Card } from './Card';
import { useChain } from '@/utils/animation';
import { getPointPath } from '@/utils/svg';

const useStrings = makeStrings({
  'en-US': {
    title: 'Backend Engineer',
  },
});

export const BackendEngineerCard: React.VFC = () => {
  const strings = useStrings();

  const router = useRouter();

  const chain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (frame) => frame / 15,
    },
  ]);

  const animated = chain.values[0]!;

  const a1 = [80, 30 + 13] as const;
  const a2 = [110, 53 + 13] as const;
  const a4 = [10, 38 + 13] as const;
  const a3 = [a2[0] - a1[0] + a4[0], a2[1] - a1[1] + a4[1]] as const;

  const h = 60;
  const b1 = [a1[0], a1[1] + h] as const;
  const b2 = [a2[0], a2[1] + h] as const;
  const b3 = [a3[0], a3[1] + h] as const;
  const b4 = [a4[0], a4[1] + h] as const;

  const color = `rgb(${255 * (1 - animated)}, ${255 * (1 - animated)}, ${
    255 * (1 - animated)
  })`;

  const backgroundColor = `rgb(${255 * animated}, ${255 * animated}, ${
    255 * animated
  })`;

  const polygonBackgroundColor = `rgba(${255 * animated}, ${255 * animated}, ${
    255 * animated
  }, ${animated})`;

  return (
    <Card
      onMouseEnter={() => chain.play()}
      onMouseLeave={() => chain.reverse()}
      color={color}
      backgroundColor={backgroundColor}
      onClick={() => router.push('/recruit/BACKEND ENGINEER')}
    >
      <div className="h-full w-full flex flex-col">
        <div className="flex-1">
          <svg viewBox="0 0 120 160">
            {/* right */}

            <polygon
              transform={`
                translate(${35 * animated} ${3 * animated})
                scale(${1 - 0.32 * animated})
              `}
              points={getPointPath(a1, a2, b2, b1)}
              stroke="currentColor"
              fill={polygonBackgroundColor}
            />

            {/* back */}
            <polygon
              transform={`
                translate(${7 * animated} ${-3 * animated})
                scale(${1 - 0.15 * animated})
              `}
              points={getPointPath(a4, a1, b1, b4)}
              stroke="currentColor"
              fill={polygonBackgroundColor}
            />

            <circle
              cx={60}
              cy={90}
              r={31}
              stroke="currentColor"
              fill={polygonBackgroundColor}
            />

            {/* left */}

            <polygon
              transform={`
                translate(${14 * animated} ${30 * animated})
                scale(${1 - 0.2 * animated})
              `}
              points={getPointPath(a4, a3, b3, b4)}
              stroke="currentColor"
              fill={polygonBackgroundColor}
            />

            {/* front */}

            <polygon
              transform={`
                translate(${25 * animated} ${37 * animated})
                scale(${1 - 0.25 * animated})
              `}
              points={getPointPath(a3, a2, b2, b3)}
              stroke="currentColor"
              fill={polygonBackgroundColor}
            />
          </svg>
        </div>

        <h2 className="text-[40px] leading-[40px] text-right">
          {strings.title}
        </h2>
      </div>
    </Card>
  );
};
