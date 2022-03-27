import { makeStrings } from '@monoid-dev/use-strings';

export const useSiteStrings = makeStrings({
  'en-US': {
    top: 'TOP',
    company: 'COMPANY',
    works: 'WORKS',
    recruit: 'RECRUIT',
    contact: 'CONTACT',
    siteName: 'Monoid',
  },
  'zh-CN': {
    top: '首页',
    company: '会社',
    works: '作品',
    recruit: '加入我们',
    contact: '联系方式',
    siteName: 'Monoid',
  },
  'ja-JP': {
    top: 'トップ',
    company: '会社概要',
    works: '実績',
    recruit: '募集',
    contact: 'お問合せ',
    siteName: 'Monoid',
  },
});
