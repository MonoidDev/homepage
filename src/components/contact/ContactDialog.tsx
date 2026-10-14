import { useEffect, useRef, useState } from 'react';

import Lottie from 'lottie-react';

import styles from './contact.module.css';
import { ContactForm } from './ContactForm';
import { useContactStrings } from './contactUtils';
import contactMailbox from '@/assets/lottie/contact-mailbox.json';

export const ContactDialog: React.FC = () => {
  const strings = useContactStrings();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);
  const close = () => dialog.current?.close();
  return (
    <>
      <button
        ref={opener}
        aria-label={strings.open}
        type="button"
        className="sm:hidden relative z-10 mt-8 bg-black text-white [--focus-ring-color:#000] rounded-full px-8 py-3 text-[24px] font-loose font-bold"
        onClick={() => {
          dialog.current?.showModal();
        }}
      >
        {strings.openVisible}
      </button>
      <div
        aria-hidden="true"
        className="sm:hidden pointer-events-none fixed left-[70vw] top-[70vh] w-[800px] h-[500px] bg-white border border-black rounded-xl p-12 opacity-50 rotate-[-15deg] font-loose"
      >
        <div className="text-[40px] font-bold">{strings.contactTitle}</div>
        <div className="mt-6 w-[350px] h-[60px] border-2 border-black rounded-full" />
        <div className="mt-4 w-[350px] h-[60px] border-2 border-black rounded-full" />
      </div>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={strings.contactTitle}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
            ),
          ).filter((element) => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => opener.current?.focus()}
      >
        <ContactForm
          className="w-[1000px] max-w-full"
          onClose={close}
          successVisual={
            !reducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none h-[160px] overflow-hidden"
              >
                <Lottie
                  autoplay
                  loop={false}
                  animationData={contactMailbox}
                  className="h-full"
                />
              </div>
            )
          }
        />
      </dialog>
    </>
  );
};
