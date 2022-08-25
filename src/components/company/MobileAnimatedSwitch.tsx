import clsx from 'clsx';

import { useCompanyStrings } from '@/data/company';
import { useAnimated } from '@/utils/animation';

export interface MobileAnimatedSwitchProps {
  current: string;
  onChangeCurrent: (c: string) => void;
}

export const MobileAnimatedSwitch = (props: MobileAnimatedSwitchProps) => {
  const { current, onChangeCurrent } = props;

  const companyStrings = useCompanyStrings();

  const target = {
    vision: 0,
    services: 0.34,
    info: 0.8,
  }[current]!;

  const [a] = useAnimated(
    (x) => Math.sin((x * (Math.PI / 2)) / 20),
    target,
    target,
  );

  const renderItem = (value: string, title: string) => {
    return (
      <div
        className={clsx(
          '[writing-mode:vertical-lr] font-bold font-loose transition-opacity transition-colors',
          value === current && 'opacity-60',
          value !== current && 'text-[#B3B3B3] opacity-30',
        )}
        onClick={() => onChangeCurrent(value)}
      >
        {title}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'relative h-full w-full flex flex-col items-end justify-between text-[20px] py-2',
        'border-l border-white border-opacity-30',
      )}
    >
      <div
        className="w-[6px] h-[82px] bg-white opacity-80 absolute top-0 left-0"
        style={{ transform: `translateY(${a * (360 - 82)}px)` }}
      />
      {renderItem('vision', companyStrings.vision)}
      {renderItem('services', companyStrings.services)}
      {renderItem('info', companyStrings.info)}
    </div>
  );
};
