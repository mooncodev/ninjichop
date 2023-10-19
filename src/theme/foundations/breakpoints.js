// 1. Import the utilities
import { useMediaQuery } from '@chakra-ui/react';
// 2. Update the breakpoints as key-value pairs
export const breakpoints = {
  sm: "420px",
  md: "620px",
  lg: "960px",
  xl: "1200px",
  '2xl': '1536px',
};


export function useDeviceMode() {
  const [isMobile, isDesktop] = useMediaQuery(['(max-width: 619px)', '(min-width: 620px)',])
  return [isMobile, isDesktop]
}
