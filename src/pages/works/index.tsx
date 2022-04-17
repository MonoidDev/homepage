import { useState } from 'react';

import clsx from 'clsx';

import d2dHover from '@/assets/images/works/d2d-hover.png';
import d2dNormal from '@/assets/images/works/d2d-normal.png';
import ihealHover from '@/assets/images/works/iheal-hover.png';
import ihealNormal from '@/assets/images/works/iheal-normal.png';
import monozipHover from '@/assets/images/works/monozip-hover.png';
import monozipNormal from '@/assets/images/works/monozip-normal.png';
import polijobHover from '@/assets/images/works/polijob-hover.png';
import polijobNormal from '@/assets/images/works/polijob-normal.png';
import uptimeMonitorHover from '@/assets/images/works/uptime-monitor-hover.png';
import uptimeMonitorNormal from '@/assets/images/works/uptime-monitor-normal.png';
import wopalHover from '@/assets/images/works/wopal-hover.png';
import wopalNormal from '@/assets/images/works/wopal-normal.png';

interface WorkCardProps {
  displayImage: string;
  hoverImage: string;
  name: string;
}

const WorkCard: React.VFC<WorkCardProps> = (props) => {
  const { name, displayImage, hoverImage } = props;

  const [hover, setHover] = useState(false);

  return (
    <div className="shrink-0 w-[43vh]">
      <div
        className="h-[59.6vh] bg-[#191b28] shrink-0 shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.4)] relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundImage: `url(${JSON.stringify(
            hover ? hoverImage : displayImage,
          )})`,
        }}
      >
        <div
          className="absolute left-0 top-0 right-0 bottom-0 bg-contain"
          style={{
            backgroundImage: `url(${displayImage})`,
          }}
        />
        <div
          className={clsx(
            'absolute left-0 top-0 right-0 bottom-0 bg-contain transition-opacity',
            !hover && 'opacity-0',
          )}
          style={{
            backgroundImage: `url(${hoverImage})`,
          }}
        />
      </div>
      <h3 className="font-dense text-[50px] pt-[8px]">{name}</h3>
    </div>
  );
};

const WorksGallery: React.VFC = () => {
  return (
    <div className="w-full overflow-x-auto flex gap-x-[40px] pt-[13vh] pb-[2rem] px-[122px] transform-gpu">
      <WorkCard
        name="WOPAL"
        displayImage={wopalNormal.src}
        hoverImage={wopalHover.src}
      />
      <WorkCard
        name="MONOZIP"
        displayImage={monozipNormal.src}
        hoverImage={monozipHover.src}
      />
      <WorkCard
        name="D2D"
        displayImage={d2dNormal.src}
        hoverImage={d2dHover.src}
      />
      <WorkCard
        name="IHEAL"
        displayImage={ihealNormal.src}
        hoverImage={ihealHover.src}
      />
      <WorkCard
        name="POLIJOB"
        displayImage={polijobNormal.src}
        hoverImage={polijobHover.src}
      />
      <WorkCard
        name="UPTIME MONITOR"
        displayImage={uptimeMonitorNormal.src}
        hoverImage={uptimeMonitorHover.src}
      />
    </div>
  );
};

export default function () {
  const baseWorks =
    'z-[-1] text-[240px] font-loose font-bold absolute pointer-events-none left-[24px] top-[42px] leading-[1]';

  return (
    <div className="flex-1 flex flex-col text-black relative z-0 overflow-scroll min-h-0">
      <h2 className={baseWorks}>WORKS</h2>
      <WorksGallery />
      <h2
        className={clsx(
          baseWorks,
          '!z-10 mix-blend-color-dodge text-[#868383]',
        )}
      >
        WORKS
      </h2>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'About | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
