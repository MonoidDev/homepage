import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDebounce } from 'usehooks-ts';

import auditAppPng from '@/assets/images/works/v2/audit-app.png';
import CollapseSvg from '@/assets/images/works/v2/collapse.svg';
import d2dBackgroundPng from '@/assets/images/works/v2/d2d-background.png';
import d2dPng from '@/assets/images/works/v2/d2d.png';
import ihealOpenPng from '@/assets/images/works/v2/iheal-open.png';
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
import { useLocale } from '@/utils/useLocale';

interface CardContent {
  name: string;
  display: React.ReactNode;
  displayOpen?: React.ReactNode;
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
            {workDescription.mobileName ?? workDescription.name}
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
  index: number;
  total: number;
  open: boolean;
  onOpenPrev: () => void;
  onOpenNext: () => void;
  onClick: () => void;
  content: CardContent;
  description: WorkDescription;
}> = (props) => {
  const {
    index,
    total,
    open,
    onClick,
    onOpenNext,
    onOpenPrev,
    content,
    description,
  } = props;

  const locale = useLocale();

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
          'h-[26px] px-[11px] rounded-full text-base leading-none font-bold font-sans',
          'border-[2px] border-black',
          'pt-[5px]',
          locale === 'en-US' && '!text-[18px] !pt-[4px] font-dense',
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
          'flex-1 flex flex-col relative z-10',
          'pl-[20px] pt-[65px] pr-[80px]',
        )}
      >
        <div className="flex gap-x-[8px]">
          <h3 className="font-dense text-[50px] leading-none shrink-0">
            {description.name}
          </h3>

          <div
            className={clsx(
              'text-[16px] font-bold leading-tight mt-[-1px]',
              locale === 'en-US' && '!text-[18px]',
            )}
          >
            {description.summary}
          </div>
        </div>

        <div className="bg-black h-[2px] mb-[10px]" />

        <div className="flex flex-wrap gap-[10px] mb-[10px]">
          {description.tags.map((t) => renderWorkDescriptionTag(t))}
        </div>

        <div
          className={clsx(
            'text-[16px] font-bold mb-[10px]',
            locale === 'en-US' && '!text-[18px] leading-tight',
            description.name === 'POLIJOB' &&
              locale === 'en-US' &&
              '!text-[14px]',
          )}
        >
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
        'flex flex-col relative z-0 shrink-0 overflow-hidden font-loose',
        'transition-[width] will-change-[width]',
        open ? 'w-[780px]' : 'w-[280px] cursor-pointer',
        '[filter:drop-shadow(18.9107px_18.9107px_18.9107px_rgba(0,0,0,0.1))]',
      )}
      onClick={open ? undefined : onClick}
    >
      <div className="flex-1 relative z-30 flex w-[780px]">
        <div className={clsx('w-[280px] flex shrink-0 relative z-0')}>
          {content?.display}

          {(open || debouncedOpen) && (
            <div
              className={clsx(
                'absolute top-0 right-0 bottom-0 left-0 flex',
                open && 'animate-in fade-in',
                !open && 'animate-out fade-out',
              )}
            >
              {content?.displayOpen}
            </div>
          )}
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
      <div className="h-[70px] font-dense text-[48px] flex justify-between">
        {description.name}

        {debouncedOpen && (
          <div className="flex items-center gap-x-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              className={clsx(
                'relative top-[-5px] cursor-pointer',
                index <= 0 && 'opacity-0 pointer-events-none',
              )}
              onClick={() => onOpenPrev()}
            >
              <path
                d="M0 9.99999L18.75 0.435221L18.75 19.5648L0 9.99999Z"
                fill="black"
              />
            </svg>
            {String(index + 1).padStart(2, '0')}/
            {String(total).padStart(2, '0')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              className={clsx(
                'relative top-[-5px] cursor-pointer',
                index >= total - 1 && 'opacity-0 pointer-events-none',
              )}
              onClick={() => onOpenNext()}
            >
              <path d="M19 10L0.25 19.5648V0.435242L19 10Z" fill="black" />
            </svg>
          </div>
        )}
      </div>
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
        className={clsx('cursor-pointer transition-opacity')}
        key={index}
        onClick={() => onChangeIndex(index)}
      >
        <h3
          className={clsx(
            'font-dense text-[36px] leading-none font-bold text-black',
            index !== currentIndex && 'text-opacity-20',
          )}
        >
          {tab.title}
        </h3>
        <p
          className={clsx(
            'font-dense text-base font-bold leading-tight text-black',
            index !== currentIndex && 'text-opacity-20',
          )}
        >
          {tab.description}
        </p>
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
  const router = useRouter();
  const { tab: _tab } = router.query as { tab: string };
  const tab = parseInt(_tab);

  const worksStrings = useWorksStrings();

  const [currentWork, setCurrentWork] = useState('');

  useEffect(() => {
    [0, 1].map((tab) => router.prefetch(`/works/${tab}`));
  }, []);

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
          <img src={ihealPng.src} className="w-[280px] h-[383px]" />
        </div>
      ),
      displayOpen: (
        <div className="flex-1 flex flex-col justify-end">
          <img
            src={ihealOpenPng.src}
            className="w-[391.38px] !h-[383px] shrink-0 self-start !max-w-none"
          />
        </div>
      ),
      tab: 0,
      background: <div className="flex-1 bg-[#fbd3cc]" />,
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
      url: 'https://uptime-monitor-staging.herokuapp.com',
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
      'text-[160px] font-loose font-bold absolute pointer-events-none left-[96px] top-[42px] leading-[1]';
    const allWorks = worksStrings.works.filter(
      (work) => cardContents.find((c) => c.name === work.name)!.tab === tab,
    );
    return (
      <div className="sm:hidden flex-1 flex flex-col text-black relative z-0 overflow-scroll min-h-0">
        <h2 className={clsx(baseWorks, 'z-[-1]')}>WORKS</h2>
        <h2 className={clsx(baseWorks, 'z-[100] mix-blend-overlay text-white')}>
          WORKS
        </h2>
        <div className="mt-[140px] px-[96px] h-[450px] flex">
          <TabNavigation
            index={tab}
            onChangeIndex={(i) => router.push(String(i))}
          />

          <div className="flex-1 overflow-x-scroll flex shrink gap-x-[40px]">
            {allWorks.map((work, i, l) => (
              <WorkCard
                index={i}
                total={l.length}
                key={work.name}
                content={cardContents.find((c) => c.name === work.name)!}
                description={work}
                open={currentWork === work.name}
                onClick={() =>
                  currentWork !== work.name
                    ? setCurrentWork(work.name)
                    : setCurrentWork('')
                }
                onOpenNext={() => setCurrentWork(allWorks[i + 1]!.name)}
                onOpenPrev={() => setCurrentWork(allWorks[i - 1]!.name)}
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

export async function getStaticPaths() {
  return {
    paths: ['en-US', 'ja-JP', 'zh-CN']
      .map((locale) =>
        [0, 1].map((tab) => ({
          params: { tab: String(tab) },
          locale,
        })),
      )
      .flat(),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'About | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
