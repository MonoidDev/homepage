import React from 'react';

import { BackendEngineerCard } from '@/components/recruit/BackendEngineerCard';
import { FrontendEngineerCard } from '@/components/recruit/FrontendEngineerCard';
import { ProductManagerCard } from '@/components/recruit/ProductManagerCard';
import { UIUXEngineerCard } from '@/components/recruit/UIUXEngineerCard';

export default function Recruit() {
  return (
    <main className="flex-1 px-[120px] py-[64px] overflow-y-auto gap-x-10 flex">
      <FrontendEngineerCard />
      <BackendEngineerCard />
      <UIUXEngineerCard />
      <ProductManagerCard />
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Jobs - Monoid',
    },
  };
}
