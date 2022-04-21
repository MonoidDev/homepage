import Lottie from 'lottie-react';

import logoBlack from '@/assets/lottie/logo-black.json';
import logoWhite from '@/assets/lottie/logo-white.json';
import { useTheme } from '@/styles/theme';

const AnimatedLogo: React.VFC<{ loadingDone: boolean }> = ({ loadingDone }) => {
  const { theme } = useTheme();

  const logoStart = theme == 'black' ? logoBlack : logoWhite;

  return (
    <Lottie
      autoplay={loadingDone}
      style={{ height: 94, width: 255, transform: 'scale(1.32)' }}
      loop={false}
      animationData={logoStart}
    />
  );
};

export default AnimatedLogo;
