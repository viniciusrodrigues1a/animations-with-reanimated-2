import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, HomeParams} from '../screens/Home';
import {MoveCircleWithPan} from '../screens/MoveCircleWithPan';
import {MoveAndPinchImage} from '../screens/MoveAndPinchImage';
import {DoubleTap} from '../screens/DoubleTap';
import {ShapesAlignmentSnap} from '../screens/ShapesAlignmentSnap';

export enum MAIN_NAVIGATION_ROUTES {
  HOME = '@MAIN_NAVIGATION/HOME',
  MOVE_CIRCLE_WITH_PAN = '@MAIN_NAVIGATION/MOVE_CIRCLE_WITH_PAN',
  MOVE_AND_PINCH_IMAGE = '@MAIN_NAVIGATION/MOVE_AND_PINCH_IMAGE',
  DOUBLE_TAP = '@MAIN_NAVIGATION/DOUBLE_TAP',
  ELEMENTS_ALIGNMENT_SNAP = '@MAIN_NAVIGATION/ELEMENTS_ALIGNMENT_SNAP',
}

export type MainNavigationParams = {
  [MAIN_NAVIGATION_ROUTES.HOME]: HomeParams;
  [MAIN_NAVIGATION_ROUTES.MOVE_CIRCLE_WITH_PAN]: undefined;
  [MAIN_NAVIGATION_ROUTES.MOVE_AND_PINCH_IMAGE]: undefined;
  [MAIN_NAVIGATION_ROUTES.DOUBLE_TAP]: undefined;
  [MAIN_NAVIGATION_ROUTES.ELEMENTS_ALIGNMENT_SNAP]: undefined;
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
        <MainStack.Screen
          name={MAIN_NAVIGATION_ROUTES.DOUBLE_TAP}
          component={DoubleTap}
        />
        <MainStack.Screen
          name={MAIN_NAVIGATION_ROUTES.ELEMENTS_ALIGNMENT_SNAP}
          component={ShapesAlignmentSnap}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
