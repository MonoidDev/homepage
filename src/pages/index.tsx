import React from 'react';

import Slogan from '@/assets/images/Slogan.svg';

export default function () {
  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <Slogan style={{ width: '80vw', marginBottom: '10rem' }} />
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
