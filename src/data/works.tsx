import { makeStrings } from '@monoid-dev/use-strings';

export interface WorkTab {
  title: string;
  description: React.ReactNode;
}

export interface WorkDescription {
  name: string;
  mobileName?: string;
  tags: string[];
  mobileTags: string[];
  summary: React.ReactNode;
  mobileSummary?: React.ReactNode;
  details: React.ReactNode;
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
        name: 'PAWPAWMALL',
        summary: (
          <>
            Pet Products
            <br />
            EC Store
          </>
        ),
        mobileSummary: 'A pet products e-commerce store with a focus on design',
        details: (
          <>
            Pawpawmall is an e-commerce store specializing in a curated
            selection of imported pet products, launched as a part of Monoid's
            PET TECH initiative. Our team handles everything in-house, from
            product selection to social media management, ensuring a consistent
            and quality experience for our customers.
          </>
        ),
        tags: [
          'UIUX Design',
          'Shopify Dev.',
          'SNS Marketing',
          'SEO',
          'Logistics & Inventory Management',
          'Product Selection & Procurement',
        ],
        mobileTags: ['Shopify'],
      },
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
      },
      {
        name: 'UPTIME MONITOR',
        summary: 'Monitor Service',
        details:
          'Uptime Monitor is a website monitoring service to acknowledge users when their endpoints go down. Users can configure the monitoring setting site by site, and get informed by both email and visualized real-time dashboard.',
        tags: ['UIUX Design', 'System Design', 'System Development'],
        mobileTags: [],
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
        name: 'PAWPAWMALL',
        summary: (
          <>
            专注于设计的
            <br />
            宠物电商
          </>
        ),
        mobileSummary: '专注于设计的宠物电商',
        details: (
          <>
            pawpawmall是 Monoid 探索 PET TECH
            领域的第一步，致力于为对美有追求的养宠人士提供完美的网络购物体验。提供海外小众设计师宠物品牌产品，以丰富日本的宠物用品市场。从市场调研、产品筛选、内容制作到社交媒体管理，MONOID
            坚持自主运营的一贯原则，确保每一环节都达到高标准。
          </>
        ),
        tags: [
          'VI/UIUX设计',
          'Shopify网店搭建',
          'SEO',
          'SNS运营',
          '物流/库存管理',
          '市场调研/数据分析',
        ],
        mobileTags: ['Shopify'],
      },
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
      },
      {
        name: 'MONOZIP API',
        mobileName: 'MONOZIP',
        summary: '中日邮编&地址信息数据检索软件及服务',
        details:
          'MONOZIP是一个提供地理信息api的网络平台，支持中日两国的地址、邮编和地理坐标等信息之间的转换。在物流，旅游等行业有着广泛的应用前景。',
        tags: ['产品VI设计', 'UIUX设计', '系统开发', '运营维护'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
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
      },
      {
        name: 'UPTIME MONITOR',
        summary: '网站存续状态监控服务',
        details:
          'Uptime Monitor 提供网站存续状态的监控服务，可在发生端点故障异常时通知用户。 用户可根据站点配置监控设置，并通过电子邮件和可视化实时仪表板获得通知。',
        tags: ['UIUX设计', '系统设计', '系统开发'],
        mobileTags: ['WEB APP'],
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
            革新的なイノベーションを起こします
          </>
        ),
      },
    ],
    works: [
      {
        name: 'PAWPAWMALL',
        summary: (
          <>
            インポートセレクト
            <br />
            ECショップ
          </>
        ),
        mobileSummary: (
          <span className="text-xl">
            ペット用品のインポートセレクト
            <br />
            ECショップ
          </span>
        ),
        details: (
          <>
            pawpawmall は Monoid の PET TECH
            事業の一環としてスタートしたインポートセレクト EC
            ショップです。デザインにこだわった海外ブランドのペット用品を提供し、ペットの生活を彩ります。商品の選定から、コンテンツ作成、SNS
            運営に至るまで、すべてを自社で一貫して行っています。
          </>
        ),
        tags: [
          'VI/UIUXデザイン',
          'ECサイト構築',
          'SEO',
          'SNS運営',
          '物流・在庫管理',
          'マーケティング',
        ],
        mobileTags: ['Shopify'],
      },
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
      },
    ],
  },
});
