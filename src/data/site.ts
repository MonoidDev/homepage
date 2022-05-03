import { makeStrings } from '@monoid-dev/use-strings';

export const useSiteStrings = makeStrings({
  'en-US': {
    top: 'TOP',
    company: 'COMPANY',
    works: 'WORKS',
    recruit: 'RECRUIT',
    contact: 'CONTACT',
    siteName: 'G.K. Monoid | 合同会社Monoid',
  },
  'zh-CN': {
    top: '首页',
    company: '关于我们',
    works: '作品集',
    recruit: '加入我们',
    contact: '联系方式',
    siteName: '合同会社Monoid | G.K. Monoid',
  },
  'ja-JP': {
    top: 'トップ',
    company: '会社概要',
    works: '開発実績',
    recruit: '募集',
    contact: 'お問合せ',
    siteName: '合同会社Monoid | G.K. Monoid',
  },
});
