import Lottie from 'lottie-react';

import recruitMailbox from '@/assets/lottie/recruit-mailbox.json';

const RecruitSuccessLottie = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <Lottie
      autoPlay
      loop={false}
      animationData={recruitMailbox}
      onComplete={onComplete}
    />
  );
};

export default RecruitSuccessLottie;
