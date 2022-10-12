import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Selfie from '../../assets/selfie.jpg';
import {Icon} from '../../components/Icon';

export const DoubleTap = () => {
  const heartIconSize = useSharedValue(0);
  const heartIconOpacity = useSharedValue(1);

  const tapIconScale = useSharedValue(1);

  const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
  const [hasFinishedTutorial, setHasFinishedTutorial] = useState(false);

  const toggleIsAnimatingHeart = () => setIsAnimatingHeart(prev => !prev);
  const finishTutorial = () => setHasFinishedTutorial(true);

  useEffect(() => {
    tapIconScale.value = withRepeat(
      withSequence(withSpring(1.15), withSpring(1)),
      -1,
    );
  }, []);

  useEffect(() => {
    if (hasFinishedTutorial) {
      cancelAnimation(tapIconScale);
    }
  }, [hasFinishedTutorial, tapIconScale]);

  const gesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(_ => {
      runOnJS(finishTutorial)();

      if (isAnimatingHeart) {
        return;
      }

      runOnJS(toggleIsAnimatingHeart)();

      heartIconSize.value = withSequence(
        withSpring(128),
        withTiming(0, {}, runOnJS(toggleIsAnimatingHeart)),
      );
    });

  const heartIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heartIconOpacity.value,
    width: heartIconSize.value,
    height: heartIconSize.value,
  }));

  const tapIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: -75},
      {translateY: -75},
      {scale: tapIconScale.value},
    ],
  }));

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF00"
        translucent
      />
      <GestureDetector gesture={gesture}>
        <View style={styles.wrapperView}>
          {!hasFinishedTutorial && (
            <>
              <Animated.View
                style={[styles.iconTutorial, tapIconAnimatedStyle]}>
                <Icon name="TapGesture" size={150} color="#888" />
              </Animated.View>

              <View style={styles.tutorialOverlay} />
            </>
          )}

          <View style={styles.container}>
            <View style={styles.heartViewWrapper}>
              <Animated.View style={heartIconAnimatedStyle}>
                <Icon name="Heart" size="100%" color="red" />
              </Animated.View>
            </View>

            <Image style={styles.image} source={Selfie} />
          </View>
        </View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
  tutorialOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 1,
  },
  iconTutorial: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    zIndex: 2,
  },
  heartViewWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
