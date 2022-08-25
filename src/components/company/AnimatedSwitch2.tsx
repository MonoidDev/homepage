import clsx from 'clsx';
// eslint-disable-next-line no-restricted-imports
import { sumBy } from 'lodash';

import { useCompanyStrings } from '@/data/company';
import { useAnimated } from '@/utils/animation';

interface SwitchItem {
  value: string;
  label: string;
  width: number;
}

const ITEM_GAP = 40;

export const AnimatedSwitch2: React.FC<{
  current: string;
  onChangeCurrent: (c: string) => void;
}> = (props) => {
  const { current, onChangeCurrent } = props;

  const companyStrings = useCompanyStrings();

  const items: SwitchItem[] = [
    {
      value: 'vision',
      label: companyStrings.vision,
      width: 103,
    },
    {
      value: 'services',
      label: companyStrings.services,
      width: 139,
    },
    {
      value: 'info',
      label: companyStrings.info,
      width: 236,
    },
  ];

  const getOffsetByValue = (value: string) => {
    const i = items.findIndex((item) => item.value === value);

    return sumBy(items.slice(0, i), (v) => v.width) + i * ITEM_GAP;
  };

  const getWidthByValue = (value: string) =>
    items.find((item) => item.value === value)!.width;

  const [offset] = useAnimated(
    (x) => Math.sin((x * (Math.PI / 2)) / 15),
    getOffsetByValue(current),
    getOffsetByValue(current),
  );

  const [width] = useAnimated(
    (x) => Math.sin((x * (Math.PI / 2)) / 15),
    getWidthByValue(current),
    getWidthByValue(current),
  );

  return (
    <div className="flex flex-col border-b border-white border-opacity-20">
      <div className="flex gap-x-[40px] font-loose font-bold text-[30px]">
        {items.map((item) => (
          <div
            key={item.value}
            className={clsx(
              item.value !== current && 'opacity-20',
              'text-white cursor-pointer tracking-tighter',
            )}
            style={{
              width: item.width,
            }}
            onClick={() => onChangeCurrent(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div
        className="h-[6px] w-[100px] bg-white origin-left"
        style={{ transform: `translateX(${offset}px) scaleX(${width}%)` }}
      />
    </div>
  );
};
