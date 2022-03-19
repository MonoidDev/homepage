export default function Company() {
  return <div>{null}</div>;
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Company - Monoid',
    },
  };
}
