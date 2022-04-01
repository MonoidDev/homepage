import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';
import FrontendEngineerArray from '@/assets/images/FrontendEngineerArray.svg';
import FrontendEngineerCurve from '@/assets/images/FrontendEngineerCurve.svg';
import { useChain } from '@/utils/animation';

const useStrings = makeStrings({
  'en-US': {
    title: 'Frontend Engineer',
  },
});

export const FrontendEngineerCard: React.VFC = () => {
  const strings = useStrings();

  const chain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (frame) => frame / 45,
    },
  ]);

  const animated = chain.values[0]!;

  const polygonPath = '10 10 110 30 110 105 10 85';

  const color = `rgb(${255 * (1 - animated)}, ${255 * (1 - animated)}, ${
    255 * (1 - animated)
  })`;

  const backgroundColor = `rgb(${255 * animated}, ${255 * animated}, ${
    255 * animated
  })`;

  const initialScale = 1.6;

  const initialTranslateY = -5;
  const targetTranslateY = 30;

  return (
    <Card
      onMouseEnter={() => chain.play()}
      onMouseLeave={() => chain.reverse()}
      onClick={() =>
        window.open(
          `mailto:ymao@monoidtech.com?subject=${encodeURI(
            'Apply for Frontend Engineer',
          )}`,
        )
      }
      color={color}
      backgroundColor={backgroundColor}
    >
      <div className="relative h-full w-full flex flex-col">
        <h2 className="text-[60px] leading-[50px] z-10 h-0">{strings.title}</h2>

        <div
          className="flex-1"
          style={{
            transform: `
              scale(${(1 - initialScale) * animated + initialScale})
              translateY(${
                (targetTranslateY - initialTranslateY) * animated +
                initialTranslateY
              }%)
            `,
          }}
        >
          <svg viewBox="0 0 120 160">
            <FrontendEngineerArray
              width={102}
              height={60}
              x={9}
              y={90 - animated * 50}
              preserveAspectRatio="none"
            />

            <mask id="polygon">
              <polygon points={polygonPath} stroke="black" fill="white" />
            </mask>

            <polygon
              points={polygonPath}
              stroke="currentColor"
              fill={backgroundColor}
            />

            <g mask="url(#polygon)">
              <FrontendEngineerCurve
                x={(-190 + animated * 190) * 1.5}
                y={-35 + animated * 37}
                width={290 * 1.5}
                height={240}
                preserveAspectRatio="none"
              />
            </g>
          </svg>
        </div>
      </div>
    </Card>
  );
};
