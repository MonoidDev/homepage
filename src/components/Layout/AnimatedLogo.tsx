import Lottie from 'lottie-react';

import Logo from '@/assets/images/Logo.svg';
import LogoWhite from '@/assets/images/LogoWhite.svg';
import logoBlack from '@/assets/lottie/logo-black.json';
import { useTheme } from '@/styles/theme';
import { useRendered } from '@/utils/useRendered';
import { useReducedMotion, useScreen } from '@/utils/useScreen';

const AnimatedLogo: React.FC<{ loadingDone: boolean }> = ({ loadingDone }) => {
  const { theme } = useTheme();

  const reduced = useReducedMotion();
  const screen = useScreen();
  const rendered = useRendered();
  if (reduced || !rendered || screen === 'mobile')
    return theme === 'black' ? (
      <LogoWhite className="w-[255px] max-w-full" />
    ) : (
      <Logo className="w-[255px] max-w-full" />
    );

  return (
    <Lottie
      className="scale-[1.16] md:scale-100"
      autoplay={loadingDone}
      style={{
        height: 94,
        width: '100%',
        maxWidth: 255,
        minWidth: 190,
        filter: theme === 'black' ? undefined : 'invert(100%)',
      }}
      loop={false}
      animationData={logoBlack}
    />
  );
};

export default AnimatedLogo;
