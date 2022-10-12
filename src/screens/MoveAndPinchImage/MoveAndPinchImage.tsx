import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

import PlantImage from '../../assets/plant.jpg';
import {Icon} from '../../components/Icon';

export const MoveAndPinchImage = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const iconScale = useSharedValue(1);
  const iconOpacity = useSharedValue(1);

  const {width, height} = Dimensions.get('window');

  const [hasFinishedTutorial, setHasFinishedTutorial] = useState(false);

  const finishTutorial = () => setHasFinishedTutorial(true);

  useEffect(() => {
    iconScale.value = withRepeat(
      withTiming(1.5, {
        duration: 1000,
        easing: Easing.quad,
      }),
      -1,
    );
    iconOpacity.value = withRepeat(
      withTiming(0, {
        duration: 1000,
        easing: Easing.quad,
      }),
      -1,
    );
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      runOnJS(finishTutorial)();

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
    runOnJS(finishTutorial)();

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

  const iconStyles = useAnimatedStyle(() => ({
    transform: [{scale: iconScale.value}],
    opacity: iconOpacity.value,
  }));

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#FFFFFF00"
        translucent
      />
      <GestureDetector gesture={gestures}>
        <View style={StyleSheet.absoluteFill}>
          {!hasFinishedTutorial && (
            <>
              <Animated.View style={[styles.iconTutorial, iconStyles]}>
                <Icon name="PinchGesture" size={150} color="#000" />
              </Animated.View>

              <View style={styles.tutorialOverlay} />
            </>
          )}

          <View style={styles.canvas}>
            <Animated.Image
              style={[styles.image, imageStyles]}
              source={PlantImage}
            />
          </View>
        </View>
      </GestureDetector>
    </>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tutorialOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  iconTutorial: {
    position: 'absolute',
    top: '65%',
    left: width / 2 - 75,
    zIndex: 2,
  },
});
