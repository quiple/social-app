import {forwardRef} from 'react'
import {createText} from '@shopify/restyle'
import {Platform} from 'react-native'

import {Theme} from 'lib/theme'

export const Text = createText<Theme>()

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TypeProps = Parameters<typeof Text>[0] & {
  as?: HeadingElements
}

const asToAriaLevel = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
}

const asToTextVariant: {
  [key in HeadingElements]: keyof Omit<Theme['textVariants'], 'defaults'>
} = {
  h1: 'xl',
  h2: 'l',
  h3: 'm',
  h4: 's',
  h5: 'xs',
  h6: '2xs',
}

export const P = forwardRef((props: Parameters<typeof Text>[0], ref) => {
  // @ts-ignore
  return <Text role="paragraph" variant="xs" {...props} ref={ref} />
})

/**
 * @see https://necolas.github.io/react-native-web/docs/accessibility/#semantic-html
 * @see https://docs.expo.dev/develop/user-interface/fonts/
 */
function createHeadingComponent(element: HeadingElements) {
  return forwardRef((props: TypeProps, ref) => {
    const as = props.as || element
    const extra = Platform.select({
      web: {
        'aria-level': asToAriaLevel[as],
      },
      default: {},
    })

    return (
      <Text
        role="heading"
        variant={asToTextVariant[as]}
        {...extra}
        {...props}
        ref={ref}
      />
    )
  })
}

export const H1 = createHeadingComponent('h1')
export const H2 = createHeadingComponent('h2')
export const H3 = createHeadingComponent('h3')
export const H4 = createHeadingComponent('h4')
export const H5 = createHeadingComponent('h5')
export const H6 = createHeadingComponent('h6')
