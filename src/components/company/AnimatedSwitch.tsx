import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import { useAnimated } from '@/utils/animation';

const useStrings = makeStrings({
  'en-US': {
    vision: 'VISION',
    info: 'COMPANY INFO',
  },
});

export interface AnimatedSwitchProps {
  current: string;
  onChangeCurrent: (c: string) => void;
}

export const AnimatedSwitch: React.VFC<AnimatedSwitchProps> = (props) => {
  const { current, onChangeCurrent } = props;

  const target = current === 'vision' ? 65 : 42;

  const strings = useStrings();

  const [a] = useAnimated(
    (x) => Math.sin((x * (Math.PI / 2)) / 45),
    target,
    target,
  );

  const R = 914.5;
  const cx = -140;
  const cy = -1540 + 914.5 - 3;

  const [startX, startY] = [
    cx + R * Math.cos((a * Math.PI) / 180),
    cy + R * Math.sin((a * Math.PI) / 180),
  ];

  const [endX, endY] = [
    cx + R * Math.cos(((a + 20) * Math.PI) / 180),
    cy + R * Math.sin(((a + 20) * Math.PI) / 180),
  ];

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 526 275">
        <path
          d={`
            M 526 0
            A ${R} ${R} 0 0 1 0 275
          `}
          stroke="currentColor"
        />

        <path
          d={`
            M ${startX} ${startY}
            A ${R} ${R} 0 0 1 ${endX} ${endY}
          `}
          stroke="currentColor"
          strokeWidth={8}
        />
      </svg>

      <div className="absolute left-0 right-0 top-0 bottom-0 font-loose font-bold text-[25px]">
        <a
          className={clsx(
            'absolute left-[120px] top-[150px] opacity-70 transition-transform',
            current === 'vision' && '!opacity-100 scale-[2] translate-x-[-30%]',
          )}
          style={{
            transitionDuration: '0.75s',
          }}
          onClick={() => onChangeCurrent('vision')}
        >
          {strings.vision}
        </a>
        <a
          className={clsx(
            'absolute right-[20px] bottom-[20px] opacity-70 transition-transform',
            current === 'info' && '!opacity-100 scale-[1.3] translate-x-[-20%]',
          )}
          style={{
            transitionDuration: '0.75s',
          }}
          onClick={() => onChangeCurrent('info')}
        >
          {strings.info}
        </a>
      </div>
    </div>
  );
};
