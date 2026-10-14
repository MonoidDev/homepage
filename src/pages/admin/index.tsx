import { makeStrings } from '@monoid-dev/use-strings';
import { useRouter } from 'next/router';

import { AdminContainer } from '@/components/Layout/AdminContainer';

const useStrings = makeStrings({
  'en-US': {
    forbidden: 'You do not have permission to view this section.',
    unavailable:
      'This section is temporarily unavailable. Please try again shortly.',
  },
  'ja-JP': {
    forbidden: 'このセクションを表示する権限がありません。',
    unavailable:
      '現在このセクションを表示できません。しばらくしてからお試しください。',
  },
  'zh-CN': {
    forbidden: '您没有权限查看此部分。',
    unavailable: '此部分暂时不可用，请稍后重试。',
  },
});

export default function AdminIndex() {
  const { query } = useRouter();
  const strings = useStrings();
  return (
    <AdminContainer>
      <div className="px-[4rem] py-[2rem]">
        <h2 className="text-[36px] font-loose mb-[1rem]">Monoid HP Admin</h2>

        {(query.error === 'forbidden' || query.error === 'unavailable') && (
          <p role="alert" className="border border-black p-4 mb-4">
            {query.error === 'forbidden'
              ? strings.forbidden
              : strings.unavailable}
          </p>
        )}
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
