import { makeStrings } from '@monoid-dev/use-strings';

import d2dHover from '@/assets/images/works/d2d-hover.png';
import d2dMobile from '@/assets/images/works/d2d-mobile.png';
import d2dNormal from '@/assets/images/works/d2d-normal.png';
import ihealHover from '@/assets/images/works/iheal-hover.png';
import ihealMobile from '@/assets/images/works/iheal-mobile.png';
import ihealNormal from '@/assets/images/works/iheal-normal.png';
import monozipHover from '@/assets/images/works/monozip-hover.png';
import monozipMobile from '@/assets/images/works/monozip-mobile.png';
import monozipNormal from '@/assets/images/works/monozip-normal.png';
import polijobHover from '@/assets/images/works/polijob-hover.png';
import polijobMobile from '@/assets/images/works/polijob-mobile.png';
import polijobNormal from '@/assets/images/works/polijob-normal.png';
import uptimeMonitorHover from '@/assets/images/works/uptime-monitor-hover.png';
import uptimeMonitorMobile from '@/assets/images/works/uptime-monitor-mobile.png';
import uptimeMonitorNormal from '@/assets/images/works/uptime-monitor-normal.png';
import wopalHover from '@/assets/images/works/wopal-hover.png';
import wopalMobile from '@/assets/images/works/wopal-mobile.png';
import wopalNormal from '@/assets/images/works/wopal-normal.png';

export interface WorkDescription {
  name: string;
  summary: React.ReactNode;
  tags: string[];
  mobileTags: string[];
  displayImage: string;
  hoverImage: string;
  mobileImage: string;
}

export const useWorksStrings = makeStrings<{ works: WorkDescription[] }>({
  'en-US': {
    works: [
      {
        name: 'WOPAL',
        summary: 'Online Training Platform For Student Sports Organizations',
        tags: ['WEB', 'APP', 'UIUX DESIGN', 'IoT'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP',
        summary: 'Open Postal Code & Address Service',
        tags: ['SaaS', 'API', 'UIUX DESIGN', 'GEOLOCATION'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
        mobileImage: monozipMobile.src,
      },
      {
        name: 'D2D',
        summary:
          'Booking & Management System For International Logistics Service',
        tags: ['WEB', 'OA', 'CLOUD', 'UIUX DESIGN'],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary:
          'Remote wellness device with audio-visual stimuli & unique aromatherapy component',
        tags: ['RasPi', 'APP', 'WEB', 'UIUX DESIGN'],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary:
          'Recruitment & Matching platform allows Scouts, Employers & Candidates to find each other',
        tags: ['SYSTEM DESIGN', 'UIUX DESIGN'],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary:
          'System Status Monitor service + application (SSMAAS), including configurable alerts',
        tags: ['OBSERVABILITY', 'ALARM SYSTEM'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
  'zh-CN': {
    works: [
      {
        name: 'WOPAL',
        summary:
          '专为高中生和大学生运动社团设计的训练平台：训练课程/数据记录/运动榜单',
        tags: ['WEB', 'APP', 'UIUX', '运维'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP',
        summary: '中日邮编&地址信息数据检索软件及服务',
        tags: ['SaaS', 'API', 'UIUX设计', '地理信息'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
        mobileImage: monozipMobile.src,
      },
      {
        name: 'D2D',
        summary: '国际运输在线预约平台&预约管理平台：前台/中台/后台',
        tags: ['系统设计', '系统开发', '云服务架构', 'UIUX设计'],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary:
          '智能香薰IoT设备项目：可以同时控制香薰/灯光/音乐的室内氛围管家',
        tags: ['RasPi', 'APP', 'WEB', 'UIUX设计', 'VI设计'],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: '可供求职中介、招聘公司、求职者三方使用的招聘平台',
        tags: ['系统设计', '系统开发'],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: '网站存续状态监控服务',
        tags: ['WEB', '警报系统'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
  'ja-JP': {
    works: [
      {
        name: 'WOPAL',
        summary: (
          <>
            高校生・大学生を中心とした、学生スポーツのためのトレーニングサービス
          </>
        ),
        tags: ['WEB開発', 'APP開発', 'UIUXデザイン', '運営保守'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP',
        summary: (
          <>
            郵便番号と住所データへの
            <br />
            無料アクセス
          </>
        ),
        tags: ['SaaS開発', 'API開発', 'UIUXデザイン', '運営保守'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
        mobileImage: monozipMobile.src,
      },
      {
        name: 'D2D',
        summary: (
          <>
            国際物流サービスのオンライン
            <br />
            予約システム・予約管理システム
          </>
        ),
        tags: ['システム設計', 'WEB開発', 'クラウド開発', '保守'],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary: (
          <>
            スマートアロマディフューザー
            <br />
            IoTプロジェクト
          </>
        ),
        tags: ['ラズパイ', 'APP開発', 'WEB開発', 'UIUXデザイン'],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: (
          <>
            人材紹介業者・求人企業・求職者
            <br />
            皆で使える採用プラットフォーム
          </>
        ),
        tags: ['システム設計', 'システム開発', 'UIUXデザイン'],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: (
          <>
            ウェブサイト
            <br />
            監視サービス
          </>
        ),
        tags: ['システム設計', 'システム開発', 'UIUXデザイン'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
});
