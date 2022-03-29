import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';

const useStrings = makeStrings({
  'en-US': {
    title: 'UI/UX Engineer',
  },
});

export const UIUXEngineerCard: React.VFC = () => {
  const strings = useStrings();

  return (
    <Card>
      <h2 className="text-[60px] leading-[50px]">{strings.title}</h2>
    </Card>
  );
};
