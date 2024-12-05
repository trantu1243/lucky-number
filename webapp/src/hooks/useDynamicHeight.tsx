import {useEffect, useState} from 'react';

export const useDynamicHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize height

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};
