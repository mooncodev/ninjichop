import { baseStyle } from "@chakra-ui/react";

export const accordionStyles = {
  components: {
    Accordion: {
      sizes: {
        md: {
          width: "65px",
          height: "25px"
        }
      },
      baseStyle: {
        textTransform: "capitalize",
        _focus: {
          boxShadow: "none",
        },

      }

    },
    AccordionItem: {
    },
    AccordionButton: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
        _active: {
          bg: "transparent",
          transform: "none",
          borderColor: "transparent",
        },
        _hover: {
          boxShadow: "none",
        },
      },
    },
    AccordionPanel: {
    },
  }
}
