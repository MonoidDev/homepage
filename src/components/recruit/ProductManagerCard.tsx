import { makeStrings } from '@monoid-dev/use-strings';

import { Card } from './Card';

const useStrings = makeStrings({
  'en-US': {
    title: 'Product Manager',
  },
});

export const ProductManagerCard: React.VFC = () => {
  const strings = useStrings();

  return (
    <Card>
      <div className="h-full w-full flex items-end">
        <h2 className="text-[60px] leading-[50px] text-left">
          {strings.title}
        </h2>
      </div>
    </Card>
  );
};
