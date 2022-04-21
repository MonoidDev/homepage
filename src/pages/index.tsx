import React, { useEffect, useState, useId } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MobileSlogan from '@/assets/images/MobileSlogan.svg';
import Slogan from '@/assets/images/Slogan.svg';
import { LgbtCircle } from '@/components/LgbtCircle';

const sloganSpeed = 5;

const shouldDisplayEasterEgg =
  new Date().getMonth() === 2 - 1 && new Date().getDate() === 24; // 2.24

const shouldDisplayLGBT =
  new Date().getMonth() === 4 - 1 &&
  new Date().getDate() >= 20 &&
  new Date().getDate() <= 30;

const initialX = 0;
const initialY = 0;

const RandomCircle: React.VFC<{ fill?: string; maxX: number; maxY: number }> = (
  props,
) => {
  const { fill = 'currentColor', maxX, maxY } = props;

  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  useEffect(() => {
    let curX = x;
    let curY = y;

    (async () => {
      while (true) {
        const theta = 2 * Math.PI * Math.random();

        let xSpeed = sloganSpeed * Math.cos(theta);
        let ySpeed = sloganSpeed * Math.sin(theta);

        for (let i = 0; i < 600; i++) {
          await new Promise((r) => requestAnimationFrame(r));

          if (curX > maxX + 100 || curX < 0 - 100) {
            xSpeed *= -1;
          }

          if (curY > maxY + 100 || curY < 0 - 100) {
            ySpeed *= -1;
          }

          curX = curX + xSpeed;
          curY = curY + ySpeed;
          setX(curX);
          setY(curY);
        }
      }
    })();
  }, []);

  if (shouldDisplayLGBT) {
    return <LgbtCircle r={180} cx={x} cy={y} />;
  }
  return <circle r={180} cx={x} cy={y} fill={fill} />;
};

const AnimatedSlogan: React.VFC = () => {
  const maskId = useId();

  return (
    <Link
      href={shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company'}
    >
      <a
        title={
          shouldDisplayLGBT
            ? 'Monoid supports LGBT rights!'
            : 'Learn More about Monoid'
        }
      >
        <svg
          className="mb-[20vh] sm:hidden"
          width={'80vw'}
          viewBox="0 0 1575 118"
        >
          <mask id={String(maskId)}>
            <Slogan fill="white" />
          </mask>

          <Slogan />

          <g mask={`url(#${maskId})`}>
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#0057b8' : undefined}
              maxX={1575}
              maxY={118}
            />
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#ffd700' : undefined}
              maxX={1575}
              maxY={118}
            />
          </g>
        </svg>
      </a>
    </Link>
  );
};

const MobileAnimatedSlogan: React.VFC = () => {
  const maskId = useId();

  return (
    <Link
      href={shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company'}
    >
      <a>
        <svg
          className=">sm:hidden [shape-rendering:optimizeSpeed]"
          width="80vw"
          viewBox="0 0 357 517"
        >
          <mask id={String(maskId)}>
            <MobileSlogan fill="white" />
          </mask>

          <MobileSlogan />
          <g mask={`url(#${maskId})`}>
            {!shouldDisplayLGBT && (
              <RandomCircle
                fill={shouldDisplayEasterEgg ? '#0057b8' : undefined}
                maxX={357}
                maxY={517}
              />
            )}
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#ffd700' : undefined}
              maxX={357}
              maxY={517}
            />
          </g>
        </svg>
      </a>
    </Link>
  );
};

export default function () {
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <AnimatedSlogan />
        <MobileAnimatedSlogan />

        <button
          onClick={() => router.push('/company')}
          className={clsx(
            'sm:hidden font-loose text-[40px] font-bold self-end px-8 pb-2 pt-4',
            'border-4 border-black hover:text-gray-700 hover:border-gray-700',
          )}
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
      title: '合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
