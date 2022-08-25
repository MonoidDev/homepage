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
  mobileName?: string;
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
        title: 'Product Incubation',
        description: 'Get your new IT business off to a good start.',
      },
      {
        title: 'DX Acceleration',
        description:
          'Accelerate the digital transformation process of your business and innovate new business models.',
      },
    ],
    works: [
      {
        name: 'WOPAL',
        summary: 'Online Training Platform For Student Sports Organizations',
        details:
          'Wopal is a sports data management system specially designed for Japanese sports club activities, integrating mobile App client, management platform and IoT Devices.',
        tags: [
          'Brand Identity',
          'UIUX Design',
          'System Development',
          'Mobile App Development',
        ],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP API',
        mobileName: 'MONOZIP',
        summary: 'Open Postal Code & Address Service',
        details:
          'MONOZIP a geographic information api provider platform, with support for conversion between addresses, zipcode and latitude/longitude.',
        tags: [
          'Brand Identity',
          'UIUX Design',
          'System Development',
          'Operation & Maintenance',
        ],
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
        tags: [
          'Analysis and evaluation of IT assets',
          'UIUX Design',
          'System Optimization Solutions',
          'Saas Solutions',
        ],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary: 'Remote Wellness Device with Aromatherapy Component',
        details:
          'iHeal is an IoT project centering on iHeal Cube, a smart aroma diffuser, around which we build the iHeal mobile app, iHeal Cube’s internal software and iHeal official website.',
        tags: [
          'Brand Identity',
          'UIUX Design',
          'PoC Development',
          'System Development',
          'Mobile App Development',
          'RasPi',
        ],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: 'Recruitment and Matching Platform',
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
        tags: [
          'Brand Identity',
          'UIUX Design',
          'System Design',
          'PoC Development',
          'System Development',
        ],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: 'Monitor Service',
        details:
          'Uptime Monitor is a website monitoring service to acknowledge users when their endpoints go down. Users can configure the monitoring setting site by site, and get informed by both email and visualized real-time dashboard.',
        tags: ['UIUX Design', 'System Design', 'System Development'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
      {
        name: 'AUDIT APP',
        summary: 'Mobile App for inspecting equipments in the factory',
        details:
          'Audit App is a mobile application for inspecting the condition of equipment in factories with a highly customizable management system.',
        tags: [
          'Analysis and evaluation of IT assets',
          'UIUX Design',
          'System Development',
          'Mobile App Development',
        ],
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
        title: '新事业创造',
        description: (
          <>
            作为您的技术合伙人
            <br />
            助力孵化新IT事业
          </>
        ),
      },
      {
        title: '信息化转型',
        description: <>加速传统业务的数字化转型进程，打造新业务模式</>,
      },
    ],
    works: [
      {
        name: 'WOPAL',
        summary:
          '专为高中生和大学生运动社团设计的训练平台：训练课程/数据记录/运动榜单',
        details:
          'Wopal是一款专为日本体育社团活动设计的，集手机App用户端及管理平台为一体的运动数据管理系统。内含训练课程/数据记录/运动榜单等特色功能。',
        tags: [
          '产品VI设计',
          'UIUX设计',
          '系统开发',
          '移动端APP开发',
          '运营维护',
        ],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP API',
        mobileName: 'MONOZIP',
        summary: '中日邮编&地址信息数据检索软件及服务',
        details:
          'MONOZIP是一个提供地理信息api的网络平台，支持中日两国的地址、邮编和地理坐标等信息之间的转换。在物流，旅游等行业有着广泛的应用前景。',
        tags: ['产品VI设计', 'UIUX设计', '系统开发', '运营维护'],
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
        tags: [
          'IT资产评估分析',
          'UIUX设计',
          '系统优化升级方案',
          'SaaS软件应用方案',
        ],
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
        tags: [
          '产品VI设计',
          'UIUX设计',
          'PoC开发',
          'MVP开发',
          '系统开发',
          '移动端APP开发',
          '树莓派',
        ],
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
        tags: [
          '产品VI设计',
          'UIUX设计',
          '系统设计',
          'PoC开发',
          'MVP开发',
          '系统开发',
        ],
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
        tags: ['UIUX设计', '系统设计', '系统开发'],
        mobileTags: ['WEB APP'],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
      {
        name: 'AUDIT APP',
        summary: (
          <>
            【传统工业数字化进程案例】
            <br />
            工厂设备检查系统
          </>
        ),
        details:
          'Audit App 是一款用于检查工厂设备状况的移动应用程序，兼具高度可定制的后台管理系统。Audit App使传统的工厂设备检查流程变得高效，便捷。',
        tags: ['IT资产评估分析', 'UIUX设计', '系统开发', '移动端APP开发'],
        mobileTags: ['APP'],
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
        mobileName: 'MONOZIP',
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
          'RasPi',
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
            MVPステージをスムーズに進めることに成功しました。
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
