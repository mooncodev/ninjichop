import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: '#e7e7e7',
  },
  header: {
    paddingBottom: '2px',
  },
  body: {
    paddingTop: '2px',
  },
  footer: {
    paddingTop: '2px',
  },
})
const sizes = definePartsStyle({
  md: {
    container: {
      borderRadius: '7px',
    },
  },
})
export const cardComponentStyles = {
  components: {
    Card: defineMultiStyleConfig({ baseStyle, sizes })
  }
}
