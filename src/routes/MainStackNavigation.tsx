import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, HomeParams} from '../screens/Home';
import {MoveCircleWithPan} from '../screens/MoveCircleWithPan';
import {MoveAndPinchImage} from '../screens/MoveAndPinchImage';

export enum MAIN_NAVIGATION_ROUTES {
  HOME = '@MAIN_NAVIGATION/HOME',
  MOVE_CIRCLE_WITH_PAN = '@MAIN_NAVIGATION/MOVE_CIRCLE_WITH_PAN',
  MOVE_AND_PINCH_IMAGE = '@MAIN_NAVIGATION/MOVE_AND_PINCH_IMAGE',
}

export type MainNavigationParams = {
  [MAIN_NAVIGATION_ROUTES.HOME]: HomeParams;
  [MAIN_NAVIGATION_ROUTES.MOVE_CIRCLE_WITH_PAN]: undefined;
  [MAIN_NAVIGATION_ROUTES.MOVE_AND_PINCH_IMAGE]: undefined;
};

const MainStack = createNativeStackNavigator<MainNavigationParams>();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={MAIN_NAVIGATION_ROUTES.HOME}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name={MAIN_NAVIGATION_ROUTES.HOME} component={Home} />
        <MainStack.Screen
          name={MAIN_NAVIGATION_ROUTES.MOVE_CIRCLE_WITH_PAN}
          component={MoveCircleWithPan}
        />
        <MainStack.Screen
          name={MAIN_NAVIGATION_ROUTES.MOVE_AND_PINCH_IMAGE}
          component={MoveAndPinchImage}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
