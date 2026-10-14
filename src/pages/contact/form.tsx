import { ContactForm } from '@/components/contact/ContactForm';
import { MobileNavigation } from '@/components/recruit/MobileNavigation';

export default function Form() {
  return (
    <>
      <MobileNavigation />
      <main className="flex-1 min-h-0 overflow-y-auto px-[48px] sm:px-[28px] py-[28px]">
        <ContactForm className="max-w-[1120px] mx-auto" />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      hideLogo: false,
      title: 'Contact | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
