import { baseStyle } from '@chakra-ui/react';

export const modalStyles = {
  components: {
    Modal: {
      parts: ['body', 'dialog', 'footer', 'header', 'overlay', 'closeButton', 'dialogContainer'],
      variants: {
        bog: {
          body: {
          },
          dialog: {
            backgroundColor: 'bog.900',
          },
        },
      },
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      }
    },
  }
}
