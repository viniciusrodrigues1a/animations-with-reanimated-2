import React from 'react';
import {StyleSheet} from 'react-native';
import {MainStackNavigation} from './routes/MainStackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const App = () => {
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <SafeAreaProvider>
        <MainStackNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
