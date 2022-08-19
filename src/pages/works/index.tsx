import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useDebounce } from 'usehooks-ts';

import auditAppPng from '@/assets/images/works/v2/audit-app.png';
import CollapseSvg from '@/assets/images/works/v2/collapse.svg';
import d2dBackgroundPng from '@/assets/images/works/v2/d2d-background.png';
import d2dPng from '@/assets/images/works/v2/d2d.png';
import ihealPng from '@/assets/images/works/v2/iheal.png';
import MonozipBackgroundSvg from '@/assets/images/works/v2/monozip-background.svg';
import monozipPng from '@/assets/images/works/v2/monozip.png';
import NewPageSvg from '@/assets/images/works/v2/new-page.svg';
import PolijobBackgroundSvg from '@/assets/images/works/v2/polijob-background.svg';
import polijobPng from '@/assets/images/works/v2/polijob.png';
import UptimeMonitorSvg from '@/assets/images/works/v2/uptime-monitor-background.svg';
import uptimeMonitorPng from '@/assets/images/works/v2/uptime-monitor.png';
import wopalPng from '@/assets/images/works/v2/wopal.png';
import { useWorksStrings, WorkDescription, WorkTab } from '@/data/works';

interface CardContent {
  name: string;
  display: React.ReactNode;
  background: React.ReactNode;
  tab: number;
  url: string;
}

interface MobileWorkCardProps {
  workDescription: WorkDescription;
  variant: 'left' | 'right';
  focused: boolean;
  onFocus: () => void;
}

const MobileWorkCard: React.VFC<MobileWorkCardProps> = (props) => {
  const { workDescription, variant, focused, onFocus } = props;

  return (
    <div onClick={onFocus} className="relative z-0">
      <div
        className={clsx(
          'relative w-[93vw] h-[52vw] bg-[#3692da] bg-cover bg-center',
          variant === 'right' && 'ml-[7vw]',
          !focused && 'z-50',
        )}
        style={{
          backgroundImage: `url(${JSON.stringify(
            workDescription.mobileImage,
          )})`,
        }}
      />
      <div
        className={clsx(
          'relative w-[93vw] h-[52vw] bg-black mt-[-38vw] ml-[3.5vw] text-white px-[4px] flex flex-col',
          focused && 'z-50',
        )}
      >
        <div className="shrink-0 h-[38vw] border-b px-[24px] text-[22px] leading-tight font-bold border-white flex justify-center items-center">
          {workDescription.summary}
        </div>

        <div className="flex flex-1 items-center px-[8px]">
          <h4 className="text-[13vw] leading-none font-dense mt-[8px]">
            {workDescription.name}
          </h4>
          <div className="flex-1" />
          {workDescription.mobileTags.map((tag) => (
            <div
              key={tag}
              className="text-[10px] h-[26px] ml-[10px] rounded-[13px] px-[10px] border border-white font-bold flex justify-center items-center"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileWorksGallery: React.VFC = () => {
  const { works } = useWorksStrings();

  const [focused, setFocused] = useState<string>('');

  return (
    <div className="flex flex-col pt-2 gap-y-6">
      {works.map((work, i) => (
        <MobileWorkCard
          key={work.name}
          focused={work.name === focused}
          onFocus={() => {
            if (work.name === focused) {
              setFocused('');
            } else {
              setFocused(work.name);
            }
          }}
          variant={(['left', 'right'] as const)[i % 2]!}
          workDescription={work}
        />
      ))}
    </div>
  );
};

const WorkCard: React.FC<{
  open: boolean;
  onClick: () => void;
  content: CardContent;
  description: WorkDescription;
}> = (props) => {
  const { open, onClick, content, description } = props;

  const debouncedOpen = useDebounce(open, 150);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedOpen) {
      requestIdleCallback(() => {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
        });
      });
    }
  }, [debouncedOpen]);

  const renderCollapseButton = () => {
    return (
      <button
        className="absolute top-[22px] right-[18px] z-[40]"
        onClick={onClick}
      >
        <CollapseSvg />
      </button>
    );
  };

  const renderWorkDescriptionTag = (tag: string) => {
    return (
      <div
        key={tag}
        className={clsx(
          'h-[26px] px-[11px] rounded-full text-base leading-none font-bold',
          'border-[2px] border-black',
          'pt-[4px]',
        )}
      >
        {tag}
      </div>
    );
  };

  const renderVisitButtion = () => {
    return (
      <a
        href={content.url}
        target="_blank"
        className={clsx(
          'self-end',
          'block h-[40px] border-black border-2 py-[6px] px-[8px] font-dense text-[21px]',
        )}
      >
        VISIT {description.name}
        <NewPageSvg className="inline-block ml-[0.5rem] relative top-[-2px]" />
      </a>
    );
  };

  const renderWorkDescription = () => {
    return (
      <div
        className={clsx(
          'flex-1 flex flex-col',
          'pl-[20px] pt-[65px] pr-[80px]',
        )}
      >
        <div className="flex gap-x-[8px]">
          <h3 className="font-dense text-[50px] leading-none shrink-0">
            {description.name}
          </h3>

          <div className="text-[16px] font-bold leading-tight mt-[-1px]">
            {description.summary}
          </div>
        </div>

        <div className="bg-black h-[2px] mb-[10px]" />

        <div className="flex flex-wrap gap-[10px] mb-[10px]">
          {description.tags.map((t) => renderWorkDescriptionTag(t))}
        </div>

        <div className="text-[16px] font-bold mb-[10px]">
          {description.details}
        </div>

        {content.url && renderVisitButtion()}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'flex flex-col relative z-0 shrink-0 overflow-hidden',
        'transition-[width] will-change-[width]',
        open ? 'w-[780px]' : 'w-[280px] cursor-pointer',
        '[filter:drop-shadow(18.9107px_18.9107px_18.9107px_rgba(0,0,0,0.1))]',
      )}
      onClick={open ? undefined : onClick}
    >
      <div className="flex-1 relative z-30 flex w-[780px]">
        <div className={clsx('w-[280px] flex shrink-0')}>
          {content?.display}
        </div>
        {renderWorkDescription()}
      </div>
      {(open || debouncedOpen) && (
        <div
          className={clsx(
            'z-20 absolute top-0 right-0 bottom-[70px] left-0 flex flex-col',
            'fill-mode-forwards',
            open && 'animate-in fade-in',
            !open && 'animate-out fade-out',
          )}
        >
          {content.background}
        </div>
      )}

      {(open || debouncedOpen) && renderCollapseButton()}

      <div className="z-10 absolute top-0 right-0 bottom-[70px] left-0 bg-[#191B28]" />
      <div className="h-[70px] font-dense text-[48px]">{description.name}</div>
    </div>
  );
};

const TabNavigation: React.FC<{
  index: number;
  onChangeIndex: (index: number) => void;
}> = (props) => {
  const { index: currentIndex, onChangeIndex } = props;

  const workStrings = useWorksStrings();

  const renderTab = (tab: WorkTab, index: number) => {
    return (
      <div
        className={clsx(
          'cursor-pointer transition-opacity',
          index !== currentIndex && 'opacity-20',
        )}
        key={index}
        onClick={() => onChangeIndex(index)}
      >
        <h3 className="font-dense text-[36px] font-bold">{tab.title}</h3>
        <p className="font-dense text-base font-bold">{tab.description}</p>
        <div
          className={clsx(
            index === currentIndex && 'bg-black',
            'h-[3px] mt-[4px]',
          )}
        />
      </div>
    );
  };

  return (
    <div
      className={
        'pb-[70px] flex flex-col justify-end gap-y-[55px] w-[180px] mr-[40px]'
      }
    >
      {workStrings.tabs.map((tab, index) => renderTab(tab, index))}
    </div>
  );
};

export default function () {
  const worksStrings = useWorksStrings();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentWork, setCurrentWork] = useState('');

  const cardContents: CardContent[] = [
    {
      name: 'WOPAL',
      display: (
        <div className="flex-1 flex justify-center items-center">
          <img src={wopalPng.src} className="w-[160px] h-[322px]" />
        </div>
      ),
      tab: 0,
      background: (
        <div className="flex-1 [background:linear-gradient(0deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2)),linear-gradient(98.04deg,#73D2FB_4.17%,#3BB2E6_30.55%,_#367ED3_67.14%)]" />
      ),
      url: 'https://wopal.dev',
    },
    {
      name: 'MONOZIP API',
      display: (
        <div className="flex-1 flex flex-col justify-end">
          <img
            src={monozipPng.src}
            className="self-start w-[308px] h-[322px] max-w-[initial]"
          />
        </div>
      ),
      tab: 0,
      background: <MonozipBackgroundSvg />,
      url: 'https://www.monozip.com',
    },
    {
      name: 'D2D',
      display: (
        <div className="flex-1 flex flex-col justify-center items-start">
          <img src={d2dPng.src} className="w-[238.5] h-[234px]" />
        </div>
      ),
      tab: 1,
      background: (
        <img
          src={d2dBackgroundPng.src}
          className="h-[380px] w-[780px] max-w-none"
        />
      ),
      url: 'https://member.d2dasia.com',
    },
    {
      name: 'iHEAL',
      display: (
        <div className="flex-1 flex flex-col justify-end">
          <img src={ihealPng.src} className="w-[280px] h-[286.5px]" />
        </div>
      ),
      tab: 0,
      background: <div className="flex-1 bg-[#FCD4C2]" />,
      url: '',
    },
    {
      name: 'POLIJOB',
      display: (
        <div className="flex-1 flex flex-col">
          <img src={polijobPng.src} className="w-[280px] h-[380px]" />
        </div>
      ),
      tab: 0,
      background: <PolijobBackgroundSvg />,
      url: '',
    },
    {
      name: 'UPTIME MONITOR',
      display: (
        <div className="flex-1 flex flex-col justify-center">
          <img src={uptimeMonitorPng.src} className="w-[280px] h-[243px]" />
        </div>
      ),
      tab: 0,
      background: <UptimeMonitorSvg />,
      url: '',
    },
    {
      name: 'AUDIT APP',
      display: (
        <div className="flex-1 flex flex-col justify-center">
          <img src={auditAppPng.src} className="w-[258px] h-[264px]" />
        </div>
      ),
      tab: 1,
      background: <UptimeMonitorSvg />,
      url: 'https://apps.apple.com/jp/app/audit-app/id1440477614',
    },
  ];

  const renderDesktop = () => {
    const baseWorks =
      'z-[-1] text-[160px] font-loose font-bold absolute pointer-events-none left-[96px] top-[42px] leading-[1]';

    return (
      <div className="sm:hidden flex-1 flex flex-col text-black relative z-0 overflow-scroll min-h-0">
        <h2 className={baseWorks}>WORKS</h2>
        <div className="mt-[140px] px-[96px] h-[450px] flex">
          <TabNavigation index={currentTab} onChangeIndex={setCurrentTab} />

          <div className="flex-1 overflow-x-scroll flex shrink gap-x-[40px]">
            {worksStrings.works
              .filter(
                (work) =>
                  cardContents.find((c) => c.name === work.name)!.tab ===
                  currentTab,
              )
              .map((work) => (
                <WorkCard
                  key={work.name}
                  content={cardContents.find((c) => c.name === work.name)!}
                  description={work}
                  open={currentWork === work.name}
                  onClick={() =>
                    currentWork !== work.name
                      ? setCurrentWork(work.name)
                      : setCurrentWork('')
                  }
                />
              ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className=">sm:hidden flex-1 flex flex-col overflow-scroll overflow-x-hidden relative z-0 pb-[2rem]">
        <h2 className="font-loose font-bold text-[90px] leading-none">WORKS</h2>

        <MobileWorksGallery />
      </div>
    );
  };

  return (
    <>
      {renderDesktop()}
      {renderMobile()}
    </>
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
