import {
  Box, Heading, HStack,
  StylesProvider, useMultiStyleConfig,
  useStyleConfig, useStyles, VStack,
} from '@chakra-ui/react';
import {
  mont
} from '../../theme/foundations/fonts.js';

const BubbleStyleConfig = {
  parts: ['Bubble','BubLabel','BubValue','BubSub'],
  baseStyle: {
    Bubble:{
      width: "100%",
      py:'12px',
    },
    BubLabel:{
      textAlign:'left',
      lineHeight: 'normal',
      width: "100%",
      color:'bog.200',
      ...mont.lt.md,
    },
    BubValue:{
      width: "100%",
      color:'brand.green',
      position: "relative",
      textAlign:'center',
      bgColor:'global.bubble',
      borderRadius: '6px',
      ...mont.md.md,
    },
    BubSub:{
      color:'bog.400',
      position: "absolute",
      right: "0",
      top: "100%",
      ...mont.md.xs,
    },

  },
  sizes: {sm: {},md: {},},
  variants: { colorful: {},},
  defaultProps: {},
};

export function Bubble(props) {
  const { size, variant,children,  ...rest } = props;
  const styles = useMultiStyleConfig("Bubble", { size,variant });
  return (
    <VStack __css={styles.Bubble} {...rest} >
      <StylesProvider value={styles}>
        {children}
      </StylesProvider>
    </VStack>
  );
}
export function BubLabel(props) {
  const styles = useStyles();
  return <Box __css={styles.BubLabel} {...props}/>;
}
export function BubValue(props) {
  const styles = useStyles();
  return <Box __css={styles.BubValue} {...props}/>;
}
export function BubSub(props) {
  const styles = useStyles();
  return <Box __css={styles.BubSub} {...props}/>;
}


export const BubbleComponent = {
  components: {
    Bubble: BubbleStyleConfig,
  },
};


