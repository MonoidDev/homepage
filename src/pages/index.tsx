import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import Slogan from '@/assets/images/Slogan.svg';

const sloganSpeed = 5;

const RandomCircle: React.VFC<{ fill?: string }> = (props) => {
  const { fill = 'currentColor' } = props;

  const xRef = useRef(Math.random() * 1575);
  const yRef = useRef(Math.random() * 118);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    (async () => {
      while (true) {
        const theta = 2 * Math.PI * Math.random();

        let xSpeed = sloganSpeed * Math.cos(theta);
        let ySpeed = sloganSpeed * Math.sin(theta);

        for (let i = 0; i < 600; i++) {
          await new Promise((r) => requestAnimationFrame(r));
          xRef.current += xSpeed;
          yRef.current += ySpeed;

          if (xRef.current > 1575 + 100 || xRef.current < 0 - 100) {
            xSpeed *= -1;
          }

          if (yRef.current > 118 + 100 || yRef.current < 0 - 100) {
            ySpeed *= -1;
          }

          forceUpdate({});
        }
      }
    })();
  }, []);

  return <circle r={180} cx={xRef.current} cy={yRef.current} fill={fill} />;
};

const AnimatedSlogan = () => {
  const shouldDisplayEasterEgg =
    new Date().getMonth() === 2 - 1 && new Date().getDate() === 24; // 2.24

  return (
    <svg className="mb-[20rem]" width={'80vw'} viewBox="0 0 1575 118">
      <mask id="slogan">
        <Slogan fill="white" />
      </mask>

      <Slogan />

      <g mask="url(#slogan)">
        <RandomCircle fill={shouldDisplayEasterEgg ? '#0057b8' : undefined} />
        <RandomCircle fill={shouldDisplayEasterEgg ? '#ffd700' : undefined} />
      </g>
    </svg>
  );
};

export default function () {
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <AnimatedSlogan />

        <button
          onClick={() => router.push('/company')}
          className="font-loose text-[40px] font-bold self-end px-8 pb-2 pt-4 border-4 border-black hover:text-gray-700 hover:border-gray-700"
        >
          LEARN MORE
        </button>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Monoid',
    },
  };
}
