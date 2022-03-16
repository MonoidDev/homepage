import { useState } from 'react';

import clsx from 'clsx';

import styles from './LayoutMenu.module.css';
import Slash from '@/assets/images/Slash.svg';
import { useSiteStrings } from '@/data/site';
import { useAnimated } from '@/utils/useAnimated';

interface MenuItemProps {
  index: number;
  textWidth: number;
  action: 'open' | 'close';
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { children, index, textWidth, action } = props;

  const [textExpanded, setTextExpanded] = useState(false);

  const width = useAnimated(
    (from, target, frame) => {
      if (frame === 30) {
        setTextExpanded(true);
      }
      return (
        from +
        ((target - from) / 30) * frame * Math.sin(((frame / 30) * Math.PI) / 2)
      );
    },
    0,
    action === 'open' ? 18 + textWidth + 50 : 0,
  );

  return (
    <button className={styles.menuItem}>
      <div
        className={clsx(
          'flex will-change-[width] transition-[transform]',
          !textExpanded && 'translate-x-full',
        )}
        style={{ width, transitionDuration: '300ms' }}
      >
        <div className="w-[18px] shrink-0" />
        <div style={{ width: textWidth }}>{children}</div>
        <div className="w-[50px] shrink-0" />
      </div>
      <Slash
        className="text-black absolute right-0 top-0"
        style={{ opacity: 0.2 + 0.1 * index }}
      />
    </button>
  );
};

export const LayoutMenu: React.VFC = (_props) => {
  const strings = useSiteStrings();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuAction, setMenuAction] = useState<'open' | 'close'>('open');

  return (
    <div className="p-12 flex">
      {/* <Lottie animationData={logoData} /> */}

      <div className="flex-1" />
      <MenuItem index={0} textWidth={48} action={menuAction}>
        {strings.top}
      </MenuItem>
      <MenuItem index={1} textWidth={120} action={menuAction}>
        {strings.company}
      </MenuItem>
      <MenuItem index={2} textWidth={91} action={menuAction}>
        {strings.works}
      </MenuItem>
      <MenuItem index={3} textWidth={104} action={menuAction}>
        {strings.recruit}
      </MenuItem>
      <MenuItem index={4} textWidth={104} action={menuAction}>
        {strings.contact}
      </MenuItem>
    </div>
  );
};
