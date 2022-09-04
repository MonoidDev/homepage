import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import Mail from '@/assets/images/Mail.svg';
import Telephone from '@/assets/images/Telephone.svg';
import { ContactDialog } from '@/components/contact/ContactDialog';
import { MobileNavigation } from '@/components/recruit/MobileNavigation';
import { useLocale } from '@/utils/useLocale';

const useStrings = makeStrings({
  'en-US': {
    access: 'Access',
    contact: 'Contact',
    jumpToGoogleMap: 'JUMP TO GOOGLE MAP',
    address: (
      <>
        〒100-0004 Tokyo, Otemachi, 1 Chome−7−2,
        <br /> Tokyo Sankei Building, 27F
      </>
    ),
  },
  'ja-JP': {
    jumpToGoogleMap: 'GOOGLE MAPで開く',
    address: <>〒100-0004 東京都大手町1-7-2 東京サンケイビル 27F</>,
  },
  'zh-CN': {
    access: '访问我们',
    contact: '联系方式',
    jumpToGoogleMap: '在 GOOGLE MAP 打开',
  },
});

export default function Contact() {
  const strings = useStrings();

  const locale = useLocale();

  const googleMapUrl =
    'https://maps.google.com/maps?width=720&height=400&hl=en&q=Tokyo%20Sankei+(Monoid)&t=&z=18&ie=UTF8&iwloc=B&output=embed';

  const renderAccess = () => {
    return (
      <div className="flex-1">
        <h2
          className={clsx(
            'font-loose font-bold text-[60px] sm:hidden mb-[1rem]',
            locale === 'zh-CN' && '!text-[60px]',
          )}
        >
          {strings.access}
        </h2>
        <div className="grayscale overflow-hidden rounded-[45px] sm:rounded-[25px] border-2 border-black">
          <iframe
            title="mapFrame"
            width="100%"
            className="h-[285px] sm:h-[340px]"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={googleMapUrl}
          />
        </div>

        <div className="flex mt-[1.5rem] gap-x-8 sm:gap-x-2">
          <button
            onClick={() => {
              window.open(googleMapUrl, '_blank');
            }}
            className="font-loose font-bold bg-black text-white text-[24px] sm:text-[20px] pt-[2px] sm:pt-[3px] leading-[1.9] h-[46px] sm:h-[40px] rounded-[23px] flex-1"
          >
            {strings.jumpToGoogleMap}
          </button>
        </div>

        <div
          className={clsx(
            'font-loose text-[24px] leading-tight mt-[1.5rem]',
            locale === 'ja-JP' && '!text-[24px] sm:!text-[24px] font-bold',
          )}
        >
          {strings.address}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    return (
      <div className="flex-1">
        <h2
          className={clsx(
            'font-loose font-bold text-[60px] sm:hidden mb-[1rem]',
            locale === 'zh-CN' && '!text-[60px]',
          )}
        >
          {strings.contact}
        </h2>

        <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[60px_1fr] gap-y-8 sm:gap-y-2 font-dense text-[28px] sm:text-[30px] sm:items-center sm:mb-[3rem] leading-tight">
          <div>
            <Telephone height={34} className="relative left-[10px] top-[2px]" />
          </div>
          <div className="pt-[4px]">
            <a href="tel:+81-03-3242-3072" className="hover:text-gray-700">
              03-3242-3072
            </a>
          </div>
          <div>
            <Mail height={28} className="relative left-[8px] top-[4px]" />
          </div>
          <div className="pt-[4px]">
            <a
              href="mailto:info@monoidtech.com"
              className="hover:text-gray-700"
            >
              info@monoidtech.com
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <MobileNavigation />
      <div
        className={clsx(
          'flex-1 flex flex-inline sm:flex-col overflow-auto',
          'px-[100px] sm:px-[28px] py-[25px] sm:py-[28px] gap-x-[3rem]',
        )}
      >
        {renderAccess()}
        <div className="w-[1px] my-6 bg-black sm:hidden" />
        <div className="h-[2rem] >sm:hidden shrink-0" />
        {renderContact()}
        <ContactDialog />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Contact | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
