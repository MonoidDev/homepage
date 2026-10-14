import { useState } from 'react';

import { LanguageMenu } from './LanguageMenu';

export const MobileLanguageMenu = () => {
  const [action, setAction] = useState<'open' | 'close'>('close');
  return (
    <div className="white mb-[18px] flex w-full justify-end px-5 text-black">
      <LanguageMenu action={action} onChangeAction={setAction} />
    </div>
  );
};
