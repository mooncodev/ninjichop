import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./global.js";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { accordionStyles } from "./components/accordion";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { cardComponentStyles } from './components/card.js';
import { SBNavLinkComponent } from '../views/navs/SBNavLink.js';
import { BubbleComponent } from '../views/bits/Bubble.js';
import { colorWheels } from './foundations/colorWheels.js';
import { SentenceTabsComponent } from '../views/bits/SentenceTabs.js';
import { formStyles } from './components/form.js';
import { modalStyles } from './components/modal.js';
// import { mode } from "@chakra-ui/theme-tools";

export default extendTheme(
  { breakpoints },
  globalStyles,
  buttonStyles,
  accordionStyles,
  badgeStyles,
  formStyles,
  linkStyles,
  modalStyles,
  drawerStyles,
  cardComponentStyles,
  BubbleComponent,
  SBNavLinkComponent,
  SentenceTabsComponent,
);
