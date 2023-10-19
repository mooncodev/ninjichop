import { Button, useStyleConfig } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { sxGlassBg2 } from '../bits/UtilityTags.js';
import React from 'react';
import { useAppStore } from '../../services/useAppStore.js';

const SBNavLinkStyleConfig = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: '100%',
    height: '30px',
    color:'black',
    p: "4px",
    bgColor:'',
    borderRadius:'25px',
    _hover:{ opacity: ".8",bgColor:'brand.blue4' },
    minWidth: "0px",
    wordWrap: "break-word",
    overflow:'hidden',
  },
  variants: {
    drawer: {
      bg: "gray.800",
      width: "100%",
      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      borderRadius: "15px",
    },
  },
  defaultProps: {
    variant: "panel",
  },
};

export function SBNavLink(props) {
  const { to, variant, children, ...rest } = props
  const styles = useStyleConfig('SBNavLink', { variant })
  return <Button as={NavLink} to={to} __css={styles} _hover={{ opacity: ".8" }}
                 onClick={()=>useAppStore.getState().set_appNavDrawerOpen(false)}
                 >{children}</Button>
}
export const SBNavLinkComponent = {
  components: {
    SBNavLink: SBNavLinkStyleConfig,
  },
};


