import 'react-native-gesture-handler';
import React, { FC, useEffect } from 'react'
import AppNavigator from '@/navigation/AppNavigator'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return <AppNavigator />
}

export default App