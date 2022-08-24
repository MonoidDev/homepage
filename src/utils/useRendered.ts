import { useEffect, useState } from 'react';

export const useRendered = () => {
  const [renderd, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return renderd;
};
