import { mode } from "@chakra-ui/theme-tools";
import { fontsTheme } from './foundations/fonts.js';
import { colorWheels } from './foundations/colorWheels.js';
//https://paletton.com/
//https://themera.vercel.app/
//http://colormind.io/bootstrap/
//best one-> https://gka.github.io/palettes/
export const globalStyles = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    ...colorWheels,
    brand: {
      outline: "#212e3e",
      // dkgreen: "#7ba735",
      // green: "#90c63e",
      // ltgreen: "#9ed648",
      blue1: "#347BFC",
      blue2: "#0084FE",
      blue3: "#0D1D2B",
      blue4: "#17314A",
      ltBlueBg: "#ECF3FF",

      red500: "#F2587A",
      pink400: "#D058D0",

      blue650: "#4d2ea2",
      blue750: "#3c2283",
      blue900: "#201048",//feature-button
      blue950: "#160b32",
      blue999: "#090a18",

      primary: "#6EC1E4",
      secondary: "#54595F",
      text: "#7A7A7A",
      accent: "#61CE70",
      a: "#30316A",
      b: "#8DBFE0",
      c: "#233DFF",

      test:'linear(0deg,  #271457, #3c2283)',
      grd1HOrngPink: "linear-gradient(90deg, #F2587A, #D058D0)",
      grd2V: "linear-gradient(0deg,  #271457, #3c2283)",
      grd2H: "linear-gradient(90deg,  #271457, #3c2283)", //.nav
      grdDiagBlue750Blk27pct: "linear(170deg,#4d2ea2, black 27%)", //landing 1st section
      grdDiagBlue750Blk60pct: "linear(170deg,#4d2ea2, black 60%)",//#main-feature
      grdDiagBlue950Pink60pct: "linear(210deg,#160b32 20%, #D058D0)",//#token-feature
      grdVPinkBlk: "linear(#F2587A, black)",
      grdHPinkBlue950: "linear(90deg, #F2587A, #160b32)",
      grdHBlue950Blk: "linear(90deg, #160b32, black)",//spacer1&2
      grdHBlue900Blk: "linear(90deg, #160b32, black)",//spacer3

      boxShadowPurp900: "1px 1px 12px 12px #201048",//.nav
      boxShadowBlk: "0px 0px 6px 6px black",//.nav
    },
    global: {
      bg: "#F9F9FA",
      panel: "#192030",
      bubble: "#1f2738",
    },
  },
  radii: {
    panelsRadius: '12px',
  },
  ...fontsTheme,
  styles: {
    global: (props) => ({
      ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': {
        boxShadow: 'none !important'
      },
      body: {
        fontFamily: 'Montserrat , Helvetica, sans-serif',
        fontWeight: 400,
        //...bgPattern,
        bg: "global.bg",
      },
      heading: 'Montserrat , Helvetica, sans-serif',
      html: {
        fontFamily: 'Montserrat , Helvetica, sans-serif',
        fontWeight: 400,
      }
    }),
  },
};

// const bgPattern = {
//   ':before': {
//     content: '" "',
//     display: 'block',
//     position: 'absolute',
//     left: '0',
//     top: '0',
//     width: '100%',
//     height: '100%',
//     opacity: '0.06',
//     backgroundImage: import('../assets/pattern-svgs/pattern5.svg'),
//     backgroundRepeat: 'repeat',
//     backgroundPosition: '50%, 50%',
//     backgroundSize: '25%',
//     pointerEvents: 'none',
//   }
// }

