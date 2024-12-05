import {useEffect} from 'react';

const useThemeColor = (color: any) => {
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }, [color]);
};

export default useThemeColor;
