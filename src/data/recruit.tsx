import { makeStrings } from '@monoid-dev/use-strings';
import { levenshteinEditDistance } from 'levenshtein-edit-distance';

export const allJobNames = [
  'FRONTENDENGINEER',
  'BACKENDENGINEER',
  'UIUXDESIGNER',
  'PRODUCTMANAGER',
  'MARKETINGDIRECTOR',
];

export interface JobDescription {
  name: string;
  mobileName: string;
  description: React.ReactNode;
  notHiring?: boolean;
}

export const useRecruitStrings = makeStrings({
  'en-US': {
    jobs: [
      {
        name: 'FRONTENDENGINEER',
        mobileName: 'Frontend Engineer',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              At G.K. Monoid, we build impressive and intuitive user interfaces
              for our clients. We are looking for experienced frontend engineers
              who are passionate about turning product designs into working
              features. Remote work and part-time participation are available.
            </p>
            <h3>What you will be doing</h3>
            <p>
              - Understanding product design requirements and user flows
              <br />
              - Implementing UI primarily in JavaScript and TypeScript
              <br />
              - Working within our frontend build pipeline
              <br />
              - Delivering features on time and within budget
              <br />- Writing and maintaining tests
            </p>
            <h3>Baseline skills</h3>
            <p>
              - Bachelor's degree in Software Engineering, Computer Science, or
              a related field
              <br />
              - Strong practical knowledge of HTML, CSS, JavaScript, and modern
              libraries
              <br />
              - Ability to write clear, maintainable code
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              - Experience with one or more of: React, Angular, Vue, Svelte
              <br />
              - Working familiarity with Node.js
              <br />
              - TypeScript proficiency
              <br />
              - Experience with one or more of: Webpack, Rollup, Vite, esbuild,
              SWC
              <br />
              - Mobile application development experience
              <br />
              - A commitment to lifelong learning in open-source frontend
              technologies
              <br />
              - 1-2 years of frontend development experience
              <br />
            </p>
            <h3>Location</h3>
            <p>Tokyo, Japan / Remote</p>
          </>
        ),
      },
      {
        name: 'BACKENDENGINEER',
        mobileName: 'Backend Engineer',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              We are looking for backend engineers who can bring fresh ideas
              from their areas of expertise. You will need to pick up and run
              many different projects, including both greenfield and mature
              systems, so versatility is essential. This role requires
              leadership and project management skills, as well as strong
              technical ability.
            </p>
            <h3>What you will be doing</h3>
            <p>
              - Executing server-side development for Monoid projects
              <br />
              - Leading medium-to-large projects across teams and locations
              <br />
              - Developing PoCs/prototypes quickly while planning for
              production-scale systems
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              - Bachelor's degree in Computer Science, Statistics, Mathematics,
              a related field, or equivalent practical experience.
              <br />
              - 3+ years of relevant software development experience
              <br />
              - Fluent written and spoken English
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              - Experience programming in C++, Java, or Python.
              <br />
              - Experience operating cloud services (e.g. Google Cloud
              Platform).
              <br />
              - Strong understanding of data structures and algorithms
              <br />
              - Working knowledge of software design
              <br />
              - Fluent written and spoken Chinese or Japanese
              <br />
            </p>
            <h3>Location</h3>
            <p>Tokyo, Japan / Remote</p>
          </>
        ),
      },
      {
        name: 'UIUXDESIGNER',
        mobileName: 'UIUX Designer',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              We are looking for UI/UX designers who combine clear interaction
              thinking with strong visual craft. You will collaborate with
              engineers and product managers to design features from discovery
              through delivery, and continuously improve product usability.
            </p>
            <h3>What you will be doing</h3>
            <p>
              - Conducting user and product research
              <br />
              - Designing wireframes and high-fidelity UI
              <br />
              - Building and maintaining design systems
              <br />
              - Working closely with engineers to ship polished experiences
              <br />- Iterating using qualitative and quantitative feedback
            </p>
            <h3>Baseline skills</h3>
            <p>
              - Portfolio demonstrating end-to-end UI/UX work
              <br />
              - Proficiency with modern design tools (e.g. Figma)
              <br />
              - Ability to clearly explain design decisions
              <br />
              - Comfort collaborating in cross-functional teams
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              - Experience designing web and mobile products
              <br />
              - Experience with prototyping and usability testing
              <br />
              - Basic understanding of frontend implementation constraints
              <br />
              - Ability to communicate in Japanese, Chinese, or English
              <br />
            </p>
            <h3>Location</h3>
            <p>Tokyo, Japan / Remote</p>
          </>
        ),
      },
      {
        name: 'PRODUCTMANAGER',
        mobileName: 'Product Manager',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              At G.K. Monoid, we build innovative products that meet client and
              customer needs. We are looking for an experienced Product Manager
              to lead our multidisciplinary development team. The ideal
              candidate can identify gaps in current offerings and propose
              practical solutions. You should be able to analyze markets, define
              product strategy, and manage the full product lifecycle. Strong
              leadership is essential, as is the ability to guide
              cross-functional teams in delivering products that meet user
              demand and increase market share.
            </p>
            <h3>What you will be doing</h3>
            <p>
              - Using observation and research to identify business
              opportunities
              <br />
              - Maintaining close communication with customers and stakeholders
              <br />
              - Defining product strategy and roadmap
              <br />
              - Deliver MRDs and PRDs with prioritized features and
              corresponding rationale
              <br />
              - Supporting designers and engineers to ensure timely delivery
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              - Bachelor’s degree or equivalent industry experience
              <br />
              - Hands-on experience in product planning or product management
              <br />
              - Strong written and verbal communication in Chinese, English, and
              Japanese
              <br />
              - Ability to share at least one product document created in
              previous work
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              - Proven success in defining products and bringing them to
              delivery
              <br />
              - Strategic thinking and leadership to achieve product goals
              <br />
              - Ability to turn user insights into clear messages and concepts,
              and identify the right channels to reach target audiences
              <br />
              - Ability to communicate technical concepts to non-technical
              customers and stakeholders
              <br />
              - Excellent verbal and written communication skills, coupled with
              strong problem-solving, analytical ability, and sound business
              judgment
              <br />
            </p>
            <h3>Location</h3>
            <p>Tokyo, Japan / Remote</p>
          </>
        ),
      },
      {
        name: 'MARKETINGDIRECTOR',
        mobileName: 'Marketing Director',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              Join G.K. Monoid as we expand into the pet technology space with
              "pawpawmall." We are committed to strengthening the bond between
              pets and their owners through unique products and services. We are
              looking for a creative, driven Marketing Director to lead
              initiatives across both B2C and B2B channels. This role is ideal
              for someone who can increase brand visibility and build meaningful
              partnerships in the pet industry.
            </p>
            <p className="text-base">
              ペットテクノロジー分野への新しい挑戦、「pawpawmall」で一緒に働きませんか？
              <br />
              私たちは、ペットと飼い主の絆を深めるユニークな製品・サービスを提供しています。マーケティングディレクターとして、B2CおよびB2Bの両チャネルで戦略立案から実行までをリードできる、経験豊富で創造性と推進力のある方を募集しています。ブランド認知の向上と、ペット業界での有意義なパートナーシップ構築を担っていただくポジションです。
            </p>
            <h3>What you will be doing</h3>
            <p>
              - Designing and executing innovative marketing strategies for our
              pet-related products and services
              <br />
              - Analyzing web advertising data to plan and execute effective
              marketing campaigns
              <br />
              - Creating engaging content for multiple social media platforms
              <br />
              - Creating and sharing press releases and PR materials that tell
              our brand story
              <br />
            </p>
            <p className="text-[16px]">
              - ペット関連製品・サービスに関するマーケティング戦略の設計・実行
              <br />
              - WEB広告データを分析し、効果的なキャンペーンを企画・実行
              <br />
              - 各種SNS向けの魅力的なコンテンツ企画・制作
              <br />
              - ブランドストーリーを伝えるプレスリリース／PR資料の作成・発信
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              - Bachelor’s degree or equivalent industry experience. <br />
              - Proven marketing track record with measurable results. <br />
              - Excellent communication skills and strong Japanese writing
              proficiency.
              <br />
              - A genuine love for pets and commitment to contributing to the
              pet industry. <br />
              - Strong experience with social media operations and trend
              analysis. <br />
              - An analytical mindset and the ability to make data-driven
              decisions. <br />
            </p>
            <p className="text-[16px]">
              - 学士号、または同等以上の実務経験。 <br />
              - 実績に裏付けられたマーケティング能力。 <br />
              - 高いコミュニケーション能力と日本語での文書作成力。
              <br />
              - ペットへの深い愛情と、業界に貢献したい意欲。
              <br />
              - SNS運用経験とトレンド分析力。 <br />
              - データに基づいた意思決定ができる分析思考。 <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              - Proven ability to create and execute marketing strategies that
              resonate with target audiences.
              <br />
              - Strategic thinking and leadership to achieve our marketing
              goals.
              <br />
              - Strong ability to derive user insights, develop impactful
              messages, and choose the most effective channels.
              <br />
              - Hands-on SNS content production skills, including smartphone
              photo/video capture and editing software usage.
              <br />
              - Ability to analyze customer feedback and adapt strategies to
              improve engagement and performance.
              <br />
              - Language skills in English, Korean, or Chinese to liaise with
              international partners.
              <br />
              - Dog owners are especially welcome, as our office currently has
              slightly more cat lovers.
              <br />
            </p>
            <p className="text-[16px]">
              - ターゲットに響くマーケティング戦略の立案・実行経験。
              <br />
              - 戦略的思考とリーダーシップによる目標達成経験。
              <br />
              {
                '- ユーザーインサイトをもとに、メッセージ設計と最適なチャネル選定ができる方。'
              }
              <br />
              {
                '- スマートフォン撮影や画像・動画編集を含む、SNSコンテンツ制作スキル。'
              }
              <br />
              - 顧客フィードバックを分析し、施策改善につなげられる方。
              <br />
              - 英語・韓国語・中国語のいずれかで海外パートナーと連携できる方。
              <br />
              - オフィスはやや猫派が多いため、犬オーナーの方も歓迎します。
              <br />
            </p>
            <h3>Location</h3>
            <p>
              Tokyo, Japan
              <br />
              <span className="text-[16px]">日本 東京</span>
            </p>
          </>
        ),
      },
    ] satisfies JobDescription[],
    notHiringDescription: (
      <div className="text-center text-xl font-loose font-bold">
        Sorry, we are not hiring at the moment.
      </div>
    ),
  },
});

export const allSkills: string[] = [
  // Security
  'Security',
  'Network Security',
  'Physical Security',
  'Penetration Testing',
  'Hacking',
  // Programming
  'Programming',
  'Python',
  'C',
  'C++',
  'C#',
  'Objective-C',
  'SQL',
  'JavaScript',
  'TypeScript',
  'Bash',
  'Rust',
  'Ruby',
  'Java',
  'Golang',
  'Haskell',
  'OCaml',
  'Scala',
  'Visual Basic',
  'Swift',
  'PHP',
  'Kotlin',
  // App Design
  'Responsive Design',
  'PWA',
  // Frontend Framework
  'React',
  'Angular',
  'Vue',
  'SolidJS',
  'Svelte',
  'Wordpress',
  'Ember',
  'Meteor',
  // State management
  'Mobx',
  'Redux',
  'Jotai',
  'Zustand',
  'DVA',
  // React-based framework
  'NextJS',
  'Docusaurus',
  'React Static',
  'UmiJS',
  'Create React App',
  // Component Library
  'Material UI',
  'Ant Design',
  'Daisy UI',
  // CSS Library
  'Tailwind CSS',
  'SASS',
  'SCSS',
  'CSS in JS',
  'CSS Module',
  'Bootstrap',
  'Semantic UI',
  // Mobile App
  'React Native',
  'Flutter',
  'Cordova',
  'Phone Gap',
  'Ionic',
  'Xamarin',
  'SwiftUI',
  'iOS Native',
  'Android Native',
  'Jetpack Compose',
  // Desktop
  'Electron',
  'Tauri',
  'Qt',
  'UWP',
  // JS Build Tool
  'Webpack',
  'Rollup',
  'Vite',
  'esbuild',
  'SWC',
  'Gulp',
  'PostCSS',
  'Grunt',
  'Parcel',
  'Snowpack',
  'Browserify',
  'Rome',
  // Backend Framework
  'Spring',
  'Flask',
  'Gorm',
  'Gin',
  'Django',
  'FastAPI',
  'Rocket',
  'Koa',
  'Lumen',
  'Laravel',
  'Express',
  '.NET',
  'ASP.NET',
  'Ruby on Rails',
  'Hibernate',
  // Cloud Infrastructure
  'AWS',
  'Google Cloud',
  'Azure',
  'Heroku',
  'Firebase',
  'AliCloud',
  'DigitalOcean',
  'IBM Cloud',
  // Data Management,
  'PostgreSQL',
  'MySQL',
  'CockroachDB',
  'Redis',
  'RabbitMQ',
  'RocketMQ',
  'MongoDB',
  'Kafka',
  // Infrastructure Tools
  'Kubernetes',
  'Docker',
  'Terraform',
  'Consul',
  'Hashicorp Vault',
  'GitLab CI',
  'Github Actions',
  'Jenkins',
  'CDK for Terraform',
  'CDK for AWS',
  'Helm Charts',
  'Vault',
  'Fragrant',
  'Nomad',
  'OpenStack',
  'Netty',
  'Nginx',
  'Apache',
  'Node',
  'Deno',
  'GitHub',
  'GitFlow',
  'CircleCI',
  'OpenAPI',
  'GRPC',
  'REST API',
  'GraphQL',
  'OAuth',
  'Chaos Engineering',
  // Big Data
  'Hadoop',
  'Spark',
  'MapReduce',
  'Hive',
  // Micro Frontend
  'Qiankun',
  // Serverless
  'Serverless',
  'AWS Lambda',
  'Cloudflare Worker',
  'Deno Deploy',
];

export const getSkillResults = (input: string) => {
  const results = allSkills
    .map((skill) => ({
      skill,
      score: levenshteinEditDistance(input, skill, true) / skill.length,
    }))
    .filter((item) => item.score < 1)
    .sort((a, b) => a.score - b.score);

  if (results.length > 0) {
    return results;
  } else {
    return ['JavaScript', 'Python', 'React', 'Django', 'TypeScript'].map(
      (skill) => ({ skill, score: 1 }),
    );
  }
};
