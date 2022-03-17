import React from 'react';

import Slogan from '@/assets/images/Slogan.svg';
import { Layout } from '@/components/Layout';
import { Meta } from '@/components/Meta';

export default function () {
  return (
    <Layout meta={<Meta title="Monoid" description="The Next New Things" />}>
      <main className="flex-1 flex flex-col justify-center items-center">
        <Slogan style={{ width: '80vw', marginBottom: '10rem' }} />
      </main>
    </Layout>
  );
}
