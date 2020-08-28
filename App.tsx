import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Header } from 'react-native-elements';

import StaticText from './StaticText';
import Theme from './Theme';
import LockerTheme from './Theme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Header
          leftComponent={{ icon: 'menu', color: LockerTheme["text-color"]}}
          centerComponent={{ text: StaticText.title, style: { color:LockerTheme["text-color"] } }}
          rightComponent={{ icon: 'home', color: LockerTheme["text-color"] }}
        />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
