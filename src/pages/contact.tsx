import { useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import Mail from '@/assets/images/Mail.svg';
import Reset from '@/assets/images/Reset.svg';
import Telephone from '@/assets/images/Telephone.svg';
import { ContactDialog } from '@/components/contact/ContactDialog';

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
});

export default function Contact() {
  const strings = useStrings();

  const [iframeKey, setIframeKey] = useState(1);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const renderAccess = () => {
    return (
      <div className="flex-1">
        <h2 className="font-loose font-bold text-[80px] sm:hidden">
          {strings.access}
        </h2>
        <div className="grayscale overflow-hidden rounded-[45px] sm:rounded-[25px] border-2 border-black">
          <iframe
            key={iframeKey}
            width="100%"
            className="h-[400px] sm:h-[340px]"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=Tokyo%20Sankei+(Monoid)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </div>

        <div className="flex mt-[1.5rem] gap-x-8 sm:gap-x-2">
          <button className="font-loose font-bold bg-black text-white text-[27px] sm:text-[20px] pt-[4px] sm:pt-[3px] leading-[1.9] h-[64px] sm:h-[40px] rounded-[32px] flex-1">
            {strings.jumpToGoogleMap}
          </button>
          <button
            onClick={() => setIframeKey((i) => i + 1)}
            className={clsx(
              'flex justify-center items-center font-dense text-black text-[40px] leading-[1.9] h-[64px] sm:h-[40px] w-[120px] sm:w-[40px] rounded-[32px]',
              'border-black border-2 hover:text-gray-800 hover:border-gray-800',
            )}
          >
            <Reset width={40} className="sm:hidden" />
            <Reset width={20} className=">sm:hidden" />
          </button>
        </div>

        <div className="font-dense text-[40px] sm:text-[30px] leading-tight mt-[1.5rem]">
          {strings.address}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    return (
      <div className="flex-1">
        <h2 className="font-loose font-bold text-[80px] pb-8 sm:hidden">
          {strings.contact}
        </h2>

        <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[60px_1fr] gap-y-8 sm:gap-y-2 font-dense text-[35px] sm:text-[30px] sm:items-center sm:mb-[3rem] leading-tight">
          <div>
            <Telephone height={45} className="sm:hidden" />
            <Telephone width={30} className=">sm:hidden relative top-[-2px]" />
          </div>
          <div>
            <a href="tel:+81-03-3242-3072" className="hover:text-gray-700">
              03-3242-3072
            </a>
          </div>
          <div>
            <Mail height={45} className="sm:hidden" />
            <Mail width={30} className=">sm:hidden" />
          </div>
          <div>
            <a
              href="mailto:ymao@monoidtech.com"
              className="hover:text-gray-700"
            >
              ymao@monoidtech.com
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'flex-1 flex flex-inline sm:flex-col overflow-auto',
        'px-[100px] sm:px-[28px] py-[40px] sm:py-[0px] gap-x-[3rem]',
      )}
    >
      {renderAccess()}
      <div className="w-[1px] my-6 bg-black sm:hidden" />
      <div className="h-[2rem] >sm:hidden shrink-0" />
      {renderContact()}
      <ContactDialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Contact - Monoid',
    },
  };
}
