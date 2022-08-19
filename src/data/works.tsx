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

export interface WorkTab {
  title: string;
  description: React.ReactNode;
}

export interface WorkDescription {
  name: string;
  summary: React.ReactNode;
  details: React.ReactNode;
  tags: string[];
  mobileTags: string[];
  displayImage: string;
  hoverImage: string;
  mobileImage: string;
}

export const useWorksStrings = makeStrings<{
  tabs: WorkTab[];
  works: WorkDescription[];
}>({
  'en-US': {
    tabs: [
      {
        title: 'Creative Projects',
        description: 'Initiate and support services',
      },
      {
        title: 'Digital Transformation',
        description: 'Boost traditional industry with digital technology',
      },
    ],
    works: [
      {
        name: 'WOPAL',
        summary: 'Online Training Platform For Student Sports Organizations',
        details:
          'Wopal is a sports data management system specially designed for Japanese sports club activities, integrating mobile App client, management platform and IoT Devices.',
        tags: ['WEB', 'APP', 'UIUX DESIGN', 'IoT'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP API',
        summary: 'Open Postal Code & Address Service',
        details:
          'MONOZIP a geographic information api provider platform, with support for conversion between addresses, zipcode and latitude/longitude.',
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
        details: (
          <>
            D2D is an online delivery platform built for a famous sino-japan
            international logistic company, consisting of a client-facing
            application and an internal booking management system.
          </>
        ),
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
        details:
          'iHeal is an IoT project centering on iHeal Cube, a smart aroma diffuser, around which we build the iHeal mobile app, iHeal Cube’s internal software and iHeal official website.',
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
        details: (
          <>
            PoliJob is an online job site that serves multiple user roles:
            headhunters, job seekers, and companies. <br />
            By adopting agile development methods, we completed the necessary
            processes such as prototype architecture, design, development and QA
            within 3 months, ensuring the smooth progress of the MVP stage of
            the project.
          </>
        ),
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
        details:
          'Uptime Monitor is a website monitoring service to acknowledge users when their endpoints go down. Users can configure the monitoring setting site by site, and get informed by both email and visualized real-time dashboard.',
        tags: ['OBSERVABILITY', 'ALARM SYSTEM'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
      {
        name: 'AUDIT APP',
        summary: 'Mobile App for inspecting  equipments in the factory',
        details:
          'Wopal is a sports data management system specially designed for Japanese sports club activities, integrating mobile App client, management platform and IoT Devices.',
        tags: [],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
  'zh-CN': {
    tabs: [
      {
        title: '创造新事业',
        description: '致力于开创新服务',
      },
      {
        title: '信息化转型',
        description: '为传统企业注入信息化动力',
      },
    ],
    works: [
      {
        name: 'WOPAL',
        summary:
          '专为高中生和大学生运动社团设计的训练平台：训练课程/数据记录/运动榜单',
        details:
          'Wopal是一款专为日本体育社团活动设计的，集手机App用户端及管理平台为一体的运动数据管理系统。内含训练课程/数据记录/运动榜单等特色功能。',
        tags: ['WEB', 'APP', 'UIUX', '运维'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP API',
        summary: '中日邮编&地址信息数据检索软件及服务',
        details:
          'MONOZIP是一个提供地理信息api的网络平台，支持中日两国的地址、邮编和地理坐标等信息之间的转换。在物流，旅游等行业有着广泛的应用前景。',
        tags: ['SaaS', 'API', 'UIUX设计', '地理信息'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
        mobileImage: monozipMobile.src,
      },
      {
        name: 'D2D',
        summary: (
          <>
            【物流行业数字化进程案例】
            <br />
            国际运输在线预约平台&预约管理平台
          </>
        ),
        details:
          'D2D是专为知名的中日国际航运物流公司打造的在线订舱管理平台，由面向用户的在线订舱系统和面向企业内部的订舱管理系统组成。D2D系统作为传统物流企业数字化进程的重要一步，改善了过往繁杂的业务处理流程，大幅增加了工作效率。',
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
        details:
          'iHeal是以iHeal Cube智能香氛机为核心的IoT开发项目，该项目包含iHeal手机App开发, iHeal Cube内软件开发，iHeal官方网站开发等子项目。通过采用敏捷开发的方式，我们在3个月内完成了原型架构、设计、开发和QA等必要流程，确保了该项目MVP阶段的顺利进行。',
        tags: ['RasPi', 'APP', 'WEB', 'UIUX设计', 'VI设计'],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: '可供求职中介、招聘公司、求职者三方使用的招聘平台',
        details:
          'PoliJob 是一个在线招聘网站，支持多种用户角色：猎头、公司和求职者。 通过采用敏捷开发的方式，我们在3个月内完成了原型架构、设计、开发和QA等必要流程，确保了该项目MVP阶段的顺利进行。',
        tags: ['系统设计', '系统开发'],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: '网站存续状态监控服务',
        details:
          'Uptime Monitor 提供网站存续状态的监控服务，可在发生端点故障异常时通知用户。 用户可根据站点配置监控设置，并通过电子邮件和可视化实时仪表板获得通知。',
        tags: ['WEB', '警报系统'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
      {
        name: 'AUDIT APP',
        summary: '【传统工业数字化进程案例】工厂设备检查系统',
        details:
          'Audit App 是一款用于检查工厂设备状况的移动应用程序，兼具高度可定制的后台管理系统。Audit App使传统的工厂设备检查流程变得高效，便捷。',
        tags: [],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
  'ja-JP': {
    tabs: [
      {
        title: '新事業創造',
        description: (
          <>
            サービスの新規
            <br />
            立ち上げ支援・共創に
            <br />
            尽力します
          </>
        ),
      },
      {
        title: 'DX推進',
        description: (
          <>
            デジタルを浸透させ
            <br />
            革新的なイノベーションを起こす
          </>
        ),
      },
    ],
    works: [
      {
        name: 'WOPAL',
        summary: (
          <>
            学生を中心にアスリートのために開発されたトレーニング・管理サービス
          </>
        ),
        details: (
          <>
            Wopalは、モバイルアプリ・管理プラットフォーム・IoTデバイスを統合した、日本のスポーツクラブ活動に特化したスポーツデータ管理システムです。
          </>
        ),
        tags: [
          'LOGO/VIデザイン',
          'UIUXデザイン',
          'システム開発',
          'モバイルアプリ開発',
          '運営保守',
        ],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP API',
        summary: (
          <>
            郵便番号と住所データへの
            <br />
            無料アクセス
          </>
        ),
        details: (
          <>
            MONOZIPは、地理情報サービスAPI提供プラットフォームサービスです。国際住所、郵便番号、経緯度の変換を簡単に、かつわかりやすく行うことができます。
          </>
        ),
        tags: ['LOGO/VIデザイン', 'UIUXデザイン', 'システム開発', '運営保守'],
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
        details: (
          <>
            D2D
            は、日中国際海運ロジスティクス企業のために構築されたオンライン予約管理プラットフォームで、顧客向けのオンライン予約システムと企業内部の予約管理システムで構成されています。
          </>
        ),
        tags: [
          'IT資産の分析・評価',
          'UIUXデザイン',
          '基幹システム再構築',
          'SaaS導入運用支援',
        ],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary: (
          <>
            スマートアロマディフューザーIoT
            <br />
            プロジェクト（MVPステージ）
          </>
        ),
        details: (
          <>
            iHealはスマートアロマディフューザー「iHeal
            cube」を中心としたIotプロジェクトです。
            構想段階からブランディングも視野に入れ、モバイルアプリのデザイン・開発、RasPiによる内部ソフトウェアの構築、公式Webサイトの作成などシステム・デザイン案件を一貫して実施しました。
          </>
        ),
        tags: [
          'LOGO/VIデザイン',
          'UIUXデザイン',
          'PoC開発',
          'システム開発',
          'モバイルアプリ開発',
          'ラズパイ',
        ],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: (
          <>ヘッドハンター・企業・求職者皆で使える採用プラットフォーム</>
        ),
        details: (
          <>
            PoliJobは、ヘッドハンター・企業・求職者という複数のユーザーロールに対応したオンライン求人サイトです。
            アジャイル開発手法を採用することで、プロトタイプアーキテクチャ、設計、開発、QA
            などの必要なプロセスを 3 か月以内に完了し、
            MVPステージをスムーズに進めることを実現しました。
          </>
        ),
        tags: [
          'LOGO/VIデザイン',
          'UIUXデザイン',
          'システム設計',
          'PoC開発',
          'システム開発',
        ],
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
        details: (
          <>
            Uptime
            Monitorは、エンドポイントに障害が発生した際に、異常をユーザーに知らせるためのWebサイト監視サービスです。サイトごとに監視設定を行うことができ、メールとリアルタイムダッシュボードによる視覚的な通知機能を備えています。
          </>
        ),
        tags: ['システム設計', 'システム開発', 'UIUXデザイン'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
      {
        name: 'AUDIT APP',
        summary: '工場内の設備の状態を検査するモバイルアプリケーション',
        details: (
          <>
            Audit
            Appは、工場内の設備の状態を検査するためのモバイルアプリケーションで、多様なカスタマイズに対応した管理システムを備えています。
          </>
        ),
        tags: [
          'IT資産の分析・評価',
          'UIUXデザイン',
          'システム開発',
          'モバイルアプリ開発',
        ],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
});
