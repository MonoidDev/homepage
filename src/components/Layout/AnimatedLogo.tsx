import Lottie from 'lottie-react';

import logoBlack from '@/assets/lottie/logo-black.json';
import { useTheme } from '@/styles/theme';

const AnimatedLogo: React.VFC<{ loadingDone: boolean }> = ({ loadingDone }) => {
  const { theme } = useTheme();

  return (
    <Lottie
      autoplay={loadingDone}
      style={{
        height: 94,
        width: 255,
        transform: 'scale(1.16)',
        filter: theme === 'black' ? undefined : 'invert(100%)',
      }}
      loop={false}
      animationData={logoBlack}
    />
  );
};

export default AnimatedLogo;
