import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import PlantImage from '../../assets/plant.jpg';

export const MoveAndPinchImage = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const {width, height} = Dimensions.get('window');

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(_ => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      focalX.value = withTiming(1);
      focalY.value = withTiming(1);
      scale.value = withTiming(1);
    });

  const pinchGesture = Gesture.Pinch().onChange(e => {
    if (e.scale <= 0.7) {
      return;
    }

    scale.value = e.scale;
    focalX.value = e.focalX;
    focalY.value = e.focalY;
  });

  const gestures = Gesture.Simultaneous(pinchGesture, panGesture);

  const imageStyles = useAnimatedStyle(() => {
    const panTranslations = [
      {translateX: translateX.value},
      {translateY: translateY.value},
    ];

    const pinchTranslations = [
      {translateX: focalX.value},
      {translateY: focalY.value},
      {translateX: -width / 2},
      {translateY: -height / 2},
      {scale: scale.value},
      {translateX: -focalX.value},
      {translateY: -focalY.value},
      {translateX: width / 2},
      {translateY: height / 2},
    ];

    return {
      transform: [...panTranslations, ...pinchTranslations],
    };
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#FFFFFF00"
        translucent
      />
      <GestureDetector gesture={gestures}>
        <View style={styles.canvas}>
          <Animated.Image
            style={[styles.image, imageStyles]}
            source={PlantImage}
          />
        </View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
