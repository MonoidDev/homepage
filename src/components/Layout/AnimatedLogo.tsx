import { useState } from 'react';

import Lottie from 'lottie-react';

import logoBlackLoop from '@/assets/lottie/logo-black-loop.json';
import logoBlackStart from '@/assets/lottie/logo-black-start.json';
import logoWhiteLoop from '@/assets/lottie/logo-white-loop.json';
import logoWhiteStart from '@/assets/lottie/logo-white-start.json';
import { useTheme } from '@/styles/theme';

const AnimatedLogo: React.VFC<{ loadingDone: boolean }> = ({ loadingDone }) => {
  const { theme } = useTheme();
  const [startDone, setStartDone] = useState(false);

  const logoLoop = theme == 'black' ? logoWhiteLoop : logoBlackLoop;
  const logoStart = theme == 'black' ? logoWhiteStart : logoBlackStart;

  return (
    <Lottie
      autoplay={loadingDone}
      style={{ height: 94, width: 255 }}
      loop={startDone}
      animationData={startDone ? logoLoop : logoStart}
      onComplete={() => setStartDone(true)}
    />
  );
};
export default AnimatedLogo;
