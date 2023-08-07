import React, {useState, useEffect} from 'react'
import 'lib/sentry' // must be relatively on top
import {useColorScheme} from 'react-native'
import {ThemeProvider as Restyle} from '@shopify/restyle'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootSiblingParent} from 'react-native-root-siblings'
import * as view from './view/index'
import * as analytics from 'lib/analytics/analytics'
import {RootStoreModel, setupState, RootStoreProvider} from './state'
import {Shell} from './view/shell/index'
import {ToastContainer} from './view/com/util/Toast.web'
import {ThemeProvider} from 'lib/ThemeContext'
import {observer} from 'mobx-react-lite'
import {theme, darkTheme} from 'lib/theme'

const App = observer(() => {
  const colorMode = useColorScheme()
  const [rootStore, setRootStore] = useState<RootStoreModel | undefined>(
    undefined,
  )

  // init
  useEffect(() => {
    view.setup()
    setupState().then(store => {
      setRootStore(store)
      analytics.init(store)
    })
  }, [])

  // show nothing prior to init
  if (!rootStore) {
    return null
  }

  return (
    <Restyle
      theme={
        rootStore.shell.colorMode === 'system'
          ? colorMode === 'dark'
            ? darkTheme
            : theme
          : rootStore.shell.colorMode === 'dark'
          ? darkTheme
          : theme
      }>
      <ThemeProvider theme={rootStore.shell.colorMode}>
        <RootSiblingParent>
          <analytics.Provider>
            <RootStoreProvider value={rootStore}>
              <SafeAreaProvider>
                <Shell />
              </SafeAreaProvider>
              <ToastContainer />
            </RootStoreProvider>
          </analytics.Provider>
        </RootSiblingParent>
      </ThemeProvider>
    </Restyle>
  )
})

export default App
