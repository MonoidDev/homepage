import { makeStrings } from '@monoid-dev/use-strings';
import Link from 'next/link';

const useStrings = makeStrings({
  'en-US': {
    title: 'PAGE NOT FOUND',
    detail: 'This page may have moved, or the address may be incorrect.',
    home: 'HOME',
    contact: 'CONTACT',
  },
  'ja-JP': {
    title: (
      <>
        ページが<span className="block">見つかりません</span>
      </>
    ),
    detail: 'ページが移動したか、アドレスが間違っている可能性があります。',
    home: 'トップページ',
    contact: 'お問い合わせ',
  },
  'zh-CN': {
    title: '未找到页面',
    detail: '页面可能已移动，或您输入的地址不正确。',
    home: '首页',
    contact: '联系我们',
  },
});
export default function NotFound() {
  const strings = useStrings();
  return (
    <main className="flex-1 overflow-y-auto px-12 sm:px-7 py-12 font-loose text-black bg-white">
      <p
        aria-hidden="true"
        className="font-dense text-[180px] sm:text-[120px] leading-none"
      >
        404
      </p>
      <h1 className="font-dense text-[64px] sm:text-[36px] leading-tight">
        {strings.title}
      </h1>
      <p className="mt-6 max-w-xl">{strings.detail}</p>
      <div className="mt-10 flex flex-wrap gap-6 font-dense text-[28px]">
        <Link href="/" className="border-b border-current py-2">
          {strings.home} →
        </Link>
        <Link href="/contact" className="border-b border-current py-2">
          {strings.contact} →
        </Link>
      </div>
    </main>
  );
}
export async function getStaticProps() {
  return { props: { theme: 'white', title: '404 | Monoid' } };
}
