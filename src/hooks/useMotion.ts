import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getInitialShouldAnimate(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  return !window.matchMedia(QUERY).matches;
}

export function useMotion(): { shouldAnimate: boolean } {
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(getInitialShouldAnimate);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldAnimate(!event.matches);
    };

    setShouldAnimate(!mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  return { shouldAnimate };
}