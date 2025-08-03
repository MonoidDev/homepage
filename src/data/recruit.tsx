import { makeStrings } from '@monoid-dev/use-strings';
import { levenshteinEditDistance } from 'levenshtein-edit-distance';

export const allJobNames = [
  'FRONTENDENGINEER',
  'BACKENDENGINEER',
  'UIUXDESIGNER',
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
              Here at G.K. Monoid, we strive hard to make impressive and
              intuitive user interfaces for our customers. We would like to hear
              from experienced front-end engineers who are enthusiastic about
              realising product designs and implementing product functionality.
              Remote working and part-time participation are available.
            </p>
            <h3>What you will be doing</h3>
            <p>
              -Understanding the product design process
              <br />
              -Implementing UI almost exclusively in JavaScript
              <br />
              -Working within the frontend build pipeline
              <br />
              -Delivering on-time/within budget
              <br />
              -Testing
            </p>
            <h3>Baseline skills</h3>
            <p>
              -Bachelor's Degree in Software Engineering/Comp. Sci or related
              field.
              <br />
              -Very relaxed and comfortable with HTML/CSS/JS + Libraries
              <br />
              -Able to write code which is understandable and maintainable
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              -Experience with one or more of: ReactJS, AngularJS, VueJS, Svelte
              <br />
              -Working familiarity with NodeJS
              <br />
              -TypeScript
              <br />
              -Experience with one or more of: Webpack, Rollup, Vite, ESBuild,
              SWC
              <br />
              -Mobile Application experience
              <br />
              -A commitment to LifeLongLearning WRT Open-Source Front-End
              <br />
              -1 - 2 years experience in Front-End Development
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
              We are searching for back-end engineers who can bring fresh ideas
              from their own area of experience. You’ll need to pick-up and
              run-with many different projects, some of which are new and some
              quite mature, so there will be a mix of legacy and greenfield
              work.You’ll therefore need to be versatile and be able to work
              with little supervision. This calls for leadership and management
              skills, as well as technical ability.
            </p>
            <h3>What you will be doing</h3>
            <p>
              -Execute server-side work on Monoid’s projects.
              <br />
              -Take charge of medium-to-large projects and work across teams and
              sites.
              <br />
              -Develop PoC’s/prototypes quickly, with the foresight to plan for
              scaling to production.
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              -Bachelor's degree in Computer Science, Statistics, Mathematics, a
              related field, or equivalent practical experience.
              <br />
              -3 years of relevant work experience in software development.
              <br />
              -Ability to speak and write in English fluently.
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              -Experience programming in C++, Java, or Python.
              <br />
              -Experience with operating Cloud services (e.g. Google Cloud
              Platform).
              <br />
              -Comfort and familiarity with data structures and algorithms
              <br />
              -Working ability in Software Design.
              <br />
              -Ability to speak and write in Chinese or Japanese fluently.
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
            <h3 className="text-center">
              Sorry, we are not hiring at the moment.
            </h3>
          </>
        ),
        notHiring: true,
      },
      {
        name: 'PRODUCTMANAGER',
        mobileName: 'Product Manager',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              Here at G.K.Monoid, we are proud to offer innovative products that
              match the requirements and desires of our customers and clients.
              To this end, we’re looking for an experienced Product Development
              Manager to lead our Multi-Disciplinary development team. The ideal
              person should be able to spot gaps in current product offerings,
              and have plenty of ideas about how to plug them. They’ll be a
              capable market analyst who can devise a strategy to successfully
              manage an entire product life cycle. Demonstrable leadership
              skills are essential, as will the ability to shepard
              cross-functional teams in the creation of products which satisfy
              consumer demands and increase market share.
            </p>
            <h3>What you will be doing</h3>
            <p>
              -Use observation and research skills to identify business
              opportunities.
              <br />
              -Stay on top of customer communications
              <br />
              -Specify product strategy and roadmap
              <br />
              -Deliver MRDs and PRDs with prioritized features and corresponding
              justification
              <br />
              -Support designers and engineers to ensure timely delivery
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              -Bachelor’s Degree or Equivalent Industry Experience
              <br />
              -Demonstrable experience in Product Planning or Management
              <br />
              -Written and Verbal skills in Chinese, English and Japanese
              <br />
              -At least one example of a document delivered in the past
              <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              -Demonstrable success in defining excellent products to delivery
              <br />
              -Strategic and Leadership skills to achieve product goals
              <br />
              -Ability to understand user insights, develop messages and
              concepts, and identify the appropriate channels to reach potential
              audiences
              <br />
              -Ability to communicate technical concepts to non-technical
              customers and clients
              <br />
              -Excellent verbal and written communication skills, coupled with
              skills in problem solving and analysis and excellent business
              judgement
              <br />
            </p>
            <h3>Location</h3>
            <p>Tokyo, Japan / Remote</p>
          </>
        ),
        notHiring: true,
      },
      {
        name: 'MARKETINGDIRECTOR',
        mobileName: 'Marketing Director',
        description: (
          <>
            <h3>About the job</h3>
            <p>
              Join G.K.Monoid as we leap into the innovative pet technology
              field with "pawpawmall." Here, we are committed to enhancing the
              special bond between pet owners and their furry friends through
              our unique products and services. We're on the hunt for a creative
              and driven Marketing Director to lead our marketing initiatives
              across both consumer (B2C) and business (B2B) channels. This role
              is perfect for someone who can boost our brand's visibility and
              build meaningful partnerships in the bustling pet supply industry.
            </p>
            <p className="text-base">
              ペットテクノロジー分野への新しい挑戦、「pawpawmall」で一緒に働きませんか？
              <br />
              私たちはペットと飼い主の家族としての絆を強化する、ユニークな製品とサービスを提供しています。マーケティングディレクターとして、消費者（B
              to C）およびビジネス（B to
              B）チャネルのマーケティング戦略をリードしていただける経験豊富で独創的な意欲のある方を探しています。この役割は、当社ブランドの認知の向上のため、活気と勢いのあるペット業界で共に活躍してくれる向上心のある方を募集します。
            </p>
            <h3>What you will be doing</h3>
            <p>
              -Design and implement inventive marketing strategies for our
              pet-related products and services.
              <br />
              -Dive into web advertising data to craft and execute compelling
              marketing campaigns.
              <br />
              -Generate engaging content for a variety of social media
              platforms.
              <br />
              -Craft and share press releases and PR materials that tell our
              exciting story.
              <br />
            </p>
            <p className="text-[16px]">
              -ペット関連製品・サービスのため、効果的なマーケティング戦略を設計・実施します。
              <br />
              -WEB広告のデータを分析し、魅力的なマーケティングキャンペーンを企画・実行します。
              <br />
              -様々なSNSプラットフォームで独創的かつ魅力的なコンテンツを生成します。
              <br />
              -ブランドストーリーをエキサイティングに伝えるプレスリリースやPR資料を作成・公表します。
              <br />
            </p>
            <h3>Baseline skills</h3>
            <p>
              -Bachelor’s Degree or equivalent industry experience. <br />
              -Proven marketing prowess with impressive results to show. <br />
              -Stellar communication skills and fluency in writing Japanese.
              <br />
              -A genuine love for pets, and a commitment to making a difference
              in the pet industry. <br />
              -Robust experience with social media and an intuitive grasp of
              trends. <br />
              -Analytical thinking and a knack for making smart, data-driven
              decisions. <br />
            </p>
            <p className="text-[16px]">
              -学士号を持っている、または同等以上の業界経験。 <br />
              -実績のあるマーケティング能力。 <br />
              -優れたコミュニケーション能力と日本語の流暢な文書作成スキル。
              <br />
              -ペットへの深い愛を持ち、ペット業界で違いを生み出す意欲に溢れている方。
              <br />
              -SNS運用経験とトレンドへの造詣が深い方。 <br />
              -分析思考とデータに基づいた意思決定のできる方。 <br />
            </p>
            <h3>Preferred Skills</h3>
            <p>
              -Demonstrated ability to concoct marketing strategies that
              resonate with our target audiences.
              <br />
              -Strategic leadership abilities to navigate and achieve our
              marketing goals.
              <br />
              -Expertise in discerning user insights, developing impactful
              messages, and pinpointing the best channels for engagement.
              <br />
              -Practical skills in creating SNS content, such as capturing
              photos and videos with smartphones, and proficiency in using
              editing software for visuals and videos.
              <br />
              -Ability to analyze customer feedback and adapt marketing
              strategies to enhance engagement and effectiveness.
              <br />
              -Language skills in English, Korean, or Chinese to liaise with
              international partners.
              <br />
              -Dog owners might find themselves particularly cherished here, as
              our office might have a tiny bit of a cat person surplus!
              <br />
            </p>
            <p className="text-[16px]">
              -顧客に響くマーケティング戦略の立案と実行をした経験のある方。
              <br />
              -戦略的思考とリーダーシップスキルでマーケティング目標を達成した経験のある方。
              <br />
              -ユーザーのニーズを深掘りし、響きやすいメッセージを最適なチャネルで発信するスキルをお持ちの方。
              <br />
              -スマートフォンで写真やビデオを撮影し、画像やビデオ編集ソフトウェアを使用するなど、SNSコンテンツを実際に作成する技術のある方。
              <br />
              -顧客のフィードバックを分析し、マーケティング戦略を調整してチームの成績向上に貢献できる方。
              <br />
              -英語、韓国語、または中国語の言語スキルで、国際的なパートナーとの連携を行える方。
              <br />
              -オフィスには猫派がやや多いため、犬を飼っている方は特に歓迎します。
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
