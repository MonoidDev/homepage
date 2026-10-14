import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';
import {
  easeInOutCubic,
  easeOutCubic,
  mix,
  segment,
  useHoverTimeline,
} from '@/utils/animation';
import { getPointPath } from '@/utils/svg';

const useStrings = makeStrings({
  'en-US': {
    title: 'Product Manager',
  },
});

type Point = readonly [number, number];

const along = (from: Point, to: Point, t: number): Point => [
  mix(from[0], to[0], t),
  mix(from[1], to[1], t),
];

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

// Trig results can differ in the last digit between Node and the browser,
// which would make server and client markup disagree during hydration.
const round = (value: number) => Math.round(value * 1000) / 1000;

// The prism: an equilateral triangle (side 52) standing on its base.
const APEX: Point = [64, 38];
const BASE_LEFT: Point = [38, 83];
const BASE_RIGHT: Point = [90, 83];

// The camera starts zoomed in around the prism.
const FOCUS: Point = [64, 66];

// One decisive beam leaves through the middle of the right face. It starts
// just inside the prism and ends just past the card's right edge.
const BEAM_EXIT = along(APEX, BASE_RIGHT, 0.5);
const BEAM_HEADING: Point = [132, 42];
const BEAM_FROM = along(BEAM_EXIT, BEAM_HEADING, -0.05);
const BEAM_TO = along(BEAM_EXIT, BEAM_HEADING, 0.8);

// Inputs enter from beyond the left edge. At rest each one points somewhere
// else (`drift`); on hover it swings onto the prism's left face.
const RAYS = [
  { y: 22, face: 0.3, drift: 14 },
  { y: 44, face: 0.4, drift: -10 },
  { y: 66, face: 0.5, drift: 7 },
  { y: 88, face: 0.6, drift: -13 },
  { y: 110, face: 0.7, drift: 10 },
].map(({ y, face, drift }) => {
  const origin: Point = [-12, y];
  const target = along(APEX, BASE_LEFT, face);
  const angle = Math.atan2(target[1] - origin[1], target[0] - origin[0]);

  return {
    origin,
    fromAngle: angle + toRadians(drift),
    toAngle: angle,
    fromLength: 170,
    toLength: Math.hypot(target[0] - origin[0], target[1] - origin[1]) + 1,
  };
});

export const ProductManagerCard: React.VFC = () => {
  const strings = useStrings();
  const { progress, enter, leave } = useHoverTimeline(1400, 1000);

  const zoom = mix(1.4, 1, easeOutCubic(segment(progress, 0, 0.5)));
  const paper = Math.round(255 * easeInOutCubic(segment(progress, 0.3, 0.5)));
  const color = `rgb(${255 - paper}, ${255 - paper}, ${255 - paper})`;
  const backgroundColor = `rgb(${paper}, ${paper}, ${paper})`;
  // Constant speed, like light: it leaves the frame at full speed, so leaving
  // the card starts retracting it at once.
  const beamEnd = along(BEAM_FROM, BEAM_TO, segment(progress, 0.6, 1));

  return (
    <Card
      onEnter={enter}
      onLeave={leave}
      href="/recruit/PRODUCTMANAGER"
      color={color}
      backgroundColor={backgroundColor}
    >
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 120 160"
        aria-hidden="true"
      >
        <g
          transform={`translate(${FOCUS[0]} ${FOCUS[1]}) scale(${round(
            zoom,
          )}) translate(${-FOCUS[0]} ${-FOCUS[1]})`}
          stroke="currentColor"
          strokeWidth={round(1 / zoom)}
        >
          {RAYS.map((ray, index) => {
            const t = easeInOutCubic(
              segment(progress, 0.04 + index * 0.05, 0.38 + index * 0.05),
            );
            const angle = mix(ray.fromAngle, ray.toAngle, t);
            // Lengths lag the swing a little, so the tails are drawn back
            // through the prism rather than stopping in mid-air.
            const length = mix(ray.fromLength, ray.toLength, t ** 2);

            return (
              <line
                key={ray.origin[1]}
                x1={ray.origin[0]}
                y1={ray.origin[1]}
                x2={round(ray.origin[0] + Math.cos(angle) * length)}
                y2={round(ray.origin[1] + Math.sin(angle) * length)}
              />
            );
          })}

          <line
            x1={round(BEAM_FROM[0])}
            y1={round(BEAM_FROM[1])}
            x2={round(beamEnd[0])}
            y2={round(beamEnd[1])}
            strokeWidth={round(2.4 / zoom)}
          />

          <polygon
            points={getPointPath(APEX, BASE_RIGHT, BASE_LEFT)}
            fill={backgroundColor}
          />
        </g>
      </svg>

      <h2 className="absolute bottom-[2rem] z-20 text-[40px] leading-[40px]">
        {strings.title}
      </h2>
    </Card>
  );
};
