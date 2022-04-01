import { useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';

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
        <h2 className="font-loose font-bold text-[80px]">{strings.access}</h2>
        <div className="grayscale overflow-hidden rounded-[45px] border-2 border-black">
          <iframe
            key={iframeKey}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=Tokyo%20Sankei+(Monoid)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/marine-gps/">navigation gps</a>
          </iframe>
        </div>

        <div className="flex mt-[1.5rem] gap-x-8">
          <button className="font-dense bg-black text-white text-[40px] leading-[1.9] h-[64px] rounded-[32px] flex-1">
            {strings.jumpToGoogleMap}
          </button>
          <button
            onClick={() => setIframeKey((i) => i + 1)}
            className="flex justify-center items-center font-dense text-black text-[40px] leading-[1.9] h-[64px] w-[120px] rounded-[32px] border-black border-2 hover:text-gray-800 hover:border-gray-800"
          >
            <Reset width={40} />
          </button>
        </div>

        <div className="font-dense text-[40px] leading-tight mt-[1.5rem]">
          {strings.address}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    return (
      <div className="flex-1">
        <h2 className="font-loose font-bold text-[80px] pb-8">
          {strings.contact}
        </h2>

        <div className="grid grid-cols-[120px_1fr] gap-y-8 font-dense text-[35px] leading-tight">
          <div>
            <Telephone height={45} />
          </div>
          <div>
            <a href="tel:+81-03-3242-3072" className="hover:text-gray-700">
              03-3242-3072
            </a>
          </div>
          <div>
            <Mail height={40} />
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
    <div className="flex-1 flex flex-inline px-[100px] py-[40px] gap-x-[3rem]">
      {renderAccess()}
      <div className="w-[1px] my-6 bg-black" />
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
