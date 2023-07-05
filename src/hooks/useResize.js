import { useEffect, useState } from 'react';

const useResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getCurrentSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    getCurrentSize();

    window.addEventListener('resize', getCurrentSize);

    return () => window.removeEventListener('resize', getCurrentSize);
  }, []);

  return size;
};

export default useResize;