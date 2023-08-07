import {createTheme} from '@shopify/restyle'

import {colors} from 'lib/styles'

export const theme = createTheme({
  spacing: {
    '2xs': 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 36,
    '2xl': 48,
  },

  /**
   * Good inspo for color naming https://polaris.shopify.com/tokens/color
   */
  colors: {
    bg: colors.white,

    // Text
    text: colors.black,
    textInverted: colors.white,

    // Interactive elements
    link: colors.blue3,

    // UI
    border: '#f0e9e9',
    icon: colors.gray4,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      color: 'text',
      letterSpacing: 0.25,
    },
    '2xl': {
      fontSize: 34,
    },
    xl: {
      fontSize: 28,
    },
    l: {
      fontSize: 22,
    },
    m: {
      fontSize: 20,
    },
    s: {
      fontSize: 18,
    },
    xs: {
      fontSize: 16,
    },
    '2xs': {
      fontSize: 14,
    },
    '3xs': {
      fontSize: 12,
    },
  },
})

export type Theme = typeof theme

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    bg: colors.black,

    // Text
    text: colors.white,
    textInverted: colors.black,

    // Interactive elements
    link: colors.blue3,

    // UI
    border: colors.gray7,
    icon: colors.gray4,
  },
}
