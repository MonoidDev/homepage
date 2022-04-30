import { AdminContainer } from '@/components/Layout/AdminContainer';

export default function AdminIndex() {
  return (
    <AdminContainer>
      <div className="px-[4rem] py-[2rem]">
        <h2 className="text-[36px] font-loose mb-[1rem]">Monoid HP Admin</h2>

        <div>Select a section on the left.</div>
      </div>
    </AdminContainer>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Admin | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
    },
  };
}
