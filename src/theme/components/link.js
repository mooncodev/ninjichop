export const linkStyles = {
  components: {
    Link: {
      // 3. We can add a new visual variant
      decoration: "none",
      baseStyle: {
        color:'white',
        _hover: {
          textDecoration: "none",
          color:'gray.600'
        },
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
