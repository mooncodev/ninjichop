
const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-32px)',
}

export const formStyles = {
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: { ...activeLabelStyles, },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              { ...activeLabelStyles, },
            'textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              { ...activeLabelStyles, },
            label: {
              top: 0, left: 0, zIndex: 2,
              position: 'absolute',
              backgroundColor: 'transparent',
              pointerEvents: 'none',
              mx: 3, my: 2, px: 1,
              transformOrigin: 'left top'
            },
          },
        },
      },
    },
  }
}
