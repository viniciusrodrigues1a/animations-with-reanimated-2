import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, HomeParams} from '../screens/Home';

export enum MAIN_NAVIGATION_ROUTES {
  HOME = '@MAIN_NAVIGATION/HOME',
}

export type MainNavigationParams = {
  [MAIN_NAVIGATION_ROUTES.HOME]: HomeParams;
};

const MainStack = createNativeStackNavigator<MainNavigationParams>();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={MAIN_NAVIGATION_ROUTES.HOME}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name={MAIN_NAVIGATION_ROUTES.HOME} component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
