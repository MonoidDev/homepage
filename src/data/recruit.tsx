import { makeStrings } from '@monoid-dev/use-strings';
import { levenshteinEditDistance } from 'levenshtein-edit-distance';

export const allJobNames = [
  'FRONTEND ENGINEER',
  'BACKEND ENGINEER',
  'UIUX DESIGNER',
  'PRODUCT MANAGER',
];

export const useRecruitStrings = makeStrings({
  'en-US': {
    jobs: [
      {
        name: 'FRONTEND ENGINEER',
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
        name: 'BACKEND ENGINEER',
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
        name: 'UIUX DESIGNER',
        description: (
          <>
            <h3 className="text-center">
              Sorry, we are not hiring at the moment.
            </h3>
          </>
        ),
      },
      {
        name: 'PRODUCT MANAGER',
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
      },
    ],
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
