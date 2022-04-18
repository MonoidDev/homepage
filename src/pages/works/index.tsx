import { useState } from 'react';

import clsx from 'clsx';

import { useWorksStrings, WorkDescription } from '@/data/works';

interface WorkCardProps {
  workDescription: WorkDescription;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const WorkCard: React.VFC<WorkCardProps> = (props) => {
  const { workDescription, onMouseEnter, onMouseLeave } = props;

  const { name, displayImage, hoverImage } = workDescription;

  const [hover, setHover] = useState(false);

  return (
    <div className="shrink-0 w-[43vh]">
      <div
        className="h-[59.6vh] bg-[#191b28] shrink-0 shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.4)] relative"
        onMouseEnter={() => {
          setHover(true);
          onMouseEnter();
        }}
        onMouseLeave={() => {
          setHover(false);
          onMouseLeave();
        }}
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
          variant === 'right' && 'ml-[9vw]',
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
          'relative w-[93vw] h-[52vw] bg-black mt-[-37vw] ml-[3.5vw] text-white px-[4px] flex flex-col',
          focused && 'z-50',
        )}
      >
        <div className="h-[38vw] border-b px-[24px] text-[22px] leading-tight font-bold border-white flex justify-center items-center">
          {workDescription.summary}
        </div>

        <div className="flex flex-1 items-center px-[8px]">
          <h4 className="text-[13vw] leading-none font-dense mt-[8px]">
            {workDescription.name}
          </h4>
          <div className="flex-1" />
          {workDescription.mobileTags.map((tag) => (
            <div className="text-[10px] h-[26px] ml-[10px] rounded-[13px] px-[10px] border border-white font-bold flex justify-center items-center">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface WorksGalleryProps {
  onChangeCurrentWork: (name: string) => void;
}

const WorksGallery: React.VFC<WorksGalleryProps> = (props) => {
  const { onChangeCurrentWork } = props;

  const { works } = useWorksStrings();

  return (
    <div className="w-full overflow-x-auto flex gap-x-[40px] pt-[13vh] pb-[2rem] px-[122px] transform-gpu">
      {works.map((work) => (
        <WorkCard
          key={work.name}
          workDescription={work}
          onMouseEnter={() => onChangeCurrentWork(work.name)}
          onMouseLeave={() => onChangeCurrentWork('')}
        />
      ))}
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

interface WorkInfoProps {
  workDescription?: WorkDescription;
  open: boolean;
}

const WorkInfo: React.VFC<WorkInfoProps> = (props) => {
  const { workDescription, open } = props;

  return (
    <div
      className={clsx(
        'w-[864px] h-[215px] absolute z-50 left-[40px] bottom-[40px] px-[52px] py-[20px] pointer-events-none',
        'bg-black bg-opacity-80 border-[3px] border-white text-white shadow-lg',
        'font-dense',
        'transition-opacity',
        !open && 'opacity-0',
      )}
    >
      <div className="flex border-b-2 border-white items-center">
        <h4 className="text-[95px] leading-[93px] mt-[0.5rem] shrink-0 pointer-events-none">
          {workDescription?.name}
        </h4>
        <p className="font-loose font-bold text-[35px] leading-[37px] pl-[1.5rem] mb-[0.75rem] pointer-events-none">
          {workDescription?.summary}
        </p>
      </div>
      <div className="flex gap-x-[20px] pt-[20px]">
        {workDescription?.tags.map((tag) => (
          <div
            key={tag}
            className={clsx(
              'border-2 border-white bg-black h-[46px] rounded-[23px] font-loose font-bold text-[26px] px-[23px]',
              'flex items-center leading-none pt-[4px]',
              'pointer-events-none',
            )}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function () {
  const worksStrings = useWorksStrings();

  const [currentWork, setCurrentWork] = useState<string>('');
  const [currentWorkOpen, setCurrentWorkOpen] = useState(false);

  const currentWorkDescription = worksStrings.works.find(
    (w) => w.name === currentWork,
  );

  const renderDesktop = () => {
    const baseWorks =
      'z-[-1] text-[240px] font-loose font-bold absolute pointer-events-none left-[24px] top-[42px] leading-[1]';

    return (
      <div className="sm:hidden flex-1 flex flex-col text-black relative z-0 overflow-scroll min-h-0">
        <h2 className={baseWorks}>WORKS</h2>
        <WorksGallery
          onChangeCurrentWork={(work) => {
            if (work) {
              setCurrentWork(work);
            }
            setCurrentWorkOpen(!!work);
          }}
        />
        <h2
          className={clsx(
            baseWorks,
            '!z-10 mix-blend-color-dodge text-[#868383]',
          )}
        >
          WORKS
        </h2>

        <WorkInfo
          workDescription={currentWorkDescription}
          open={currentWorkOpen}
        />
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className=">sm:hidden flex-1 flex flex-col overflow-scroll relative z-0 pb-[2rem]">
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
