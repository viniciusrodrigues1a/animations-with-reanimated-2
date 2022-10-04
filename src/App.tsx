import React from 'react';
import {StyleSheet} from 'react-native';
import {MainStackNavigation} from './routes/MainStackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const App = () => {
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <MainStackNavigation />
    </GestureHandlerRootView>
  );
};
