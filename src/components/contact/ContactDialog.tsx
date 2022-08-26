import { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';
import Lottie from 'lottie-react';

import { ContactForm } from './ContactForm';
import contactMailbox from '@/assets/lottie/contact-mailbox.json';
import { useChain } from '@/utils/animation';

export const ContactDialog: React.FC = () => {
  const [mailboxOpen, setMailboxOpen] = useState(false);

  const chain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (f) => Math.sin(((f / 20) * Math.PI) / 2),
    },
  ]);

  const loadingChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (f) => Math.sin(((f / 20) * Math.PI) / 2),
    },
  ]);

  const mailboxChain = useChain([
    {
      from: 1,
      to: 0,
      interpolate: (f) => Math.sin(((f / 20) * Math.PI) / 2),
    },
  ]);

  const onClose = useCallback(async () => {
    await chain.reverse();
  }, []);

  const t = chain.values[0]!;
  const s = loadingChain.values[0]!;

  useEffect(() => {
    requestIdleCallback(() => {
      loadingChain.play();
    });
  }, []);

  const renderMailbox = () => {
    return (
      <div
        className={clsx(
          'fixed left-0 right-0 top-[var(--navbarHeight) bottom-0]',
        )}
        style={{
          opacity: mailboxChain.currentValue,
        }}
      >
        <Lottie
          autoPlay={true}
          loop={false}
          animationData={contactMailbox}
          onComplete={async () => {
            chain.reset();
            await mailboxChain.play();
            setMailboxOpen(false);
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'sm:hidden fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center z-[100]',
        'pt-[var(--navbarHeight)]',
        'bg-black',
        'font-loose pointer-events-none',
      )}
      style={
        {
          '--tw-bg-opacity': 0.6 * t,
        } as any
      }
    >
      <div
        className={clsx(
          'relative pointer-events-auto',
          t === 0 && 'cursor-pointer',
        )}
        style={{
          left: `${50 * (1 - t)}vw`,
          top: `${30 * (1 - t) + 60 * (1 - s)}vh`,
          opacity: mailboxOpen === false ? 0.5 + (1 - 0.5) * t : 0,
          transform: `scale(${0.9 + 0.1 * t}) rotate(${-15 * (1 - t)}deg)`,
        }}
        onClick={async () => {
          if (t === 0) {
            await chain.play();
          }
        }}
      >
        <ContactForm
          open={t === 1}
          onClose={onClose}
          onSuccess={() => {
            mailboxChain.reset();
            setMailboxOpen(true);
          }}
          className={t === 1 ? undefined : 'pointer-events-none'}
        />
      </div>

      {mailboxOpen && renderMailbox()}
    </div>
  );
};
