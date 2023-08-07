import {createBox} from '@shopify/restyle'

import {Theme} from 'lib/theme'

export const Box = createBox<Theme>()
export type BoxProps = React.ComponentPropsWithRef<typeof Box>
