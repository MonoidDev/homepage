export default function () {
  return null;
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Company - Monoid',
    },
  };
}
