import "@fontsource/raleway/200.css"
import "@fontsource/raleway/300.css"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/600.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/800.css"
import "@fontsource/raleway/900.css"

import "@fontsource/montserrat/200.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/800.css"
import "@fontsource/montserrat/900.css"

import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/500.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/800.css"

import "@fontsource/playfair-display/400.css"
import "@fontsource/playfair-display/500.css"
import "@fontsource/playfair-display/600.css"
import "@fontsource/playfair-display/700.css"
import "@fontsource/playfair-display/800.css"
import "@fontsource/playfair-display/900.css"

import "@fontsource/poppins/200.css"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/800.css"
import "@fontsource/poppins/900.css"

import "@fontsource/rubik/300.css"
import "@fontsource/rubik/400.css"
import "@fontsource/rubik/500.css"
import "@fontsource/rubik/600.css"
import "@fontsource/rubik/700.css"
import "@fontsource/rubik/800.css"
import "@fontsource/rubik/900.css"

import "@fontsource/quicksand/300.css"
import "@fontsource/quicksand/400.css"
import "@fontsource/quicksand/500.css"
import "@fontsource/quicksand/600.css"
import "@fontsource/quicksand/700.css"

import "@fontsource/inter/200.css"
import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"
import "@fontsource/inter/900.css"

import "@fontsource/fira-code/300.css"
import "@fontsource/fira-code/400.css"
import "@fontsource/fira-code/500.css"
import "@fontsource/fira-code/600.css"
import "@fontsource/fira-code/700.css"

export const fontsTheme = {
  fonts: {
    body: 'Montserrat, Helvetica, sans-serif',
    rale: 'Raleway, Helvetica, sans-serif',
    mont: 'Montserrat, Helvetica, sans-serif',
    mono: "Menlo, monospace",
    fira: "Fira Code, monospace",

    opensans: "Open Sans, sans-serif",
    playfair: "Playfair Display, serif",
    poppins: "Poppins, sans-serif",
    rubik: "Rubik, sans-serif",
    quicksand: "Quicksand, sans-serif",
    inter: "Inter, sans-serif",
  },
  fontWeights: {
    rale: { light: 300, medium: 500, bold: 700, heavy: 900, },
    mont: { light: 300, medium: 500, bold: 700, heavy: 900, },
  },
}

function buildFontTree( famStr, weightsObj, sizesObj, rv = {} ){
  for(let [wKey,wVal] of Object.entries(weightsObj)){rv[wKey] = {};
    for(let [sKey,sVal] of Object.entries(sizesObj)){rv[wKey][sKey] = {
        fontFamily: famStr, fontWeight:wVal, fontSize:sVal }}}
  return rv;
}
const montFam = 'mont'
const raleFam = 'mont'
const w = {
  lt:300,
  md:500,
  bd:700,
  hv:900,
};
const s = {
  xs:'.6rem',
  sm:'.8rem',
  md:'.9rem',
  lg:'1.2rem',
  xl:'1.5rem',
}
/** a shorthand which spreads 3 css object props for the font Montserrat
 * @interface mont.[lt|md|bd|hv].[xs|sm|md|lg|xl],
 * @description { ...mont.weightKey.sizeKey, }
 * @example { ...mont.hv.lg, }
 * @example { ...mont.md.xs, }
 * @example { ...mont.lt.xl, }
 * */
export const mont = {
  lt: {
    xs: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.xl},
  },
  md: {
    xs: { fontFamily: montFam, fontWeight:w.md, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.md, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.md, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.md, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.md, fontSize: s.xl},
  },
  bd: {
    xs: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.xl},
  },
  hv: {
    xs: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.xl},
  },
}

/** a shorthand which spreads 3 css object props for the font Raleway
 * @interface rale.[lt|md|bd|hv].[xs|sm|md|lg|xl],
 * @description { ...rale.weightKey.sizeKey, }
 * @example { ...rale.hv.lg, }
 * @example { ...rale.md.xs, }
 * @example { ...rale.lt.xl, }
 * */
export const rale = {
  lt: {
    xs: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.xl},
  },
  md: {
    xs: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.xl},
  },
  bd: {
    xs: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.xl},
  },
  hv: {
    xs: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.xl},
  },
}
export const fira = {
  fontFamily: "Fira Code",
}

// /** rale.[lt|md|bd|hv].[xs|sm|md|lg|xl] */
// export const rale = buildFontTree(raleFam,montWeights,montSizes)
// /** mont.[lt|md|bd|hv].[xs|sm|md|lg|xl]**/
// export const mont = buildFontTree(montFam,montWeights,montSizes)
// /** rale.[lt|md|bd|hv].[xs|sm|md|lg|xl]**/
// export const rale = buildFontTree(raleFam,montWeights,montSizes)
