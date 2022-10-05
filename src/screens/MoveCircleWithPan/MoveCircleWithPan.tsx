import React, {useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, View, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const CIRCUMFERENCE = 40;
const RADIUS = CIRCUMFERENCE / 2;

const YELLOW_BOX_WIDTH = 250;
const YELLOW_BOX_HEIGHT = 100;

const RED_BOX_WIDTH = 100;
const RED_BOX_HEIGHT = 100;

type XY = {
  x: number;
  y: number;
};

type SquareXY = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

export const MoveCircleWithPan = () => {
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
  const halfWidthCircleOrigin = windowWidth / 2 - RADIUS;
  const initialYPosition = windowHeight / 5;
  const x = useSharedValue(halfWidthCircleOrigin);
  const y = useSharedValue(initialYPosition);

  const [yellowBoxXY, setYellowBoxXY] = useState<XY | null>(null);
  const [redBoxXY, setRedBoxXY] = useState<XY | null>(null);

  const hasCursorCollidedWith = (
    cursor: XY,
    square: SquareXY,
    accountForRadius = false,
  ) => {
    'worklet';
    const r = accountForRadius ? RADIUS : 0;
    const hasCollidedHorizontally =
      cursor.x + r >= square.x0 && cursor.x - r <= square.x1;
    const hasCollidedVertically =
      cursor.y + r >= square.y0 && cursor.y - r <= square.y1;

    return {
      didCollide: hasCollidedHorizontally && hasCollidedVertically,
      didCollideH: hasCollidedHorizontally,
      didCollideV: hasCollidedVertically,
    };
  };

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      const absoluteXCircleOrigin = event.absoluteX - RADIUS;
      const absoluteYCircleOrigin = event.absoluteY - RADIUS;

      if (redBoxXY) {
        const redBoxX0 = redBoxXY.x;
        const redBoxX1 = redBoxXY.x + RED_BOX_WIDTH;

        const redBoxY0 = redBoxXY.y;
        const redBoxY1 = redBoxXY.y + RED_BOX_HEIGHT;

        const cursor = {
          x: event.absoluteX,
          y: event.absoluteY,
        };

        const square = {
          x0: redBoxX0,
          x1: redBoxX1,
          y0: redBoxY0,
          y1: redBoxY1,
        };

        const isOnTop = y.value < redBoxY0;
        const isUnder = y.value + RADIUS > redBoxY1;
        const isToTheLeft = x.value < redBoxX0;
        const isToTheRight = x.value + RADIUS > redBoxX1;

        const topYValue = redBoxY0 - CIRCUMFERENCE;
        const bottomYValue = redBoxY1;
        const leftXValue = redBoxX0 - CIRCUMFERENCE;
        const rightXValue = redBoxX1;

        const {didCollide, didCollideH, didCollideV} = hasCursorCollidedWith(
          cursor,
          square,
          true,
        );

        const isLockedOnTopWithCursorOnBottom =
          didCollideH && y.value === topYValue && event.absoluteY >= redBoxY1;
        const isLockedOnBottomWithCursorOnTop =
          didCollideH &&
          y.value === bottomYValue &&
          event.absoluteY <= redBoxY0;
        const isLockedToTheLeftWithCursorOnTheRight =
          didCollideV && x.value === leftXValue && event.absoluteX >= redBoxX1;
        const isLockedToTheRightWithCursorOnTheLeft =
          didCollideV && x.value === rightXValue && event.absoluteX <= redBoxX0;

        const isTryingToPassThroughRedBoxVertically =
          isLockedOnTopWithCursorOnBottom || isLockedOnBottomWithCursorOnTop;

        const isTryingToPassThroughRedBoxHorizontally =
          isLockedToTheLeftWithCursorOnTheRight ||
          isLockedToTheRightWithCursorOnTheLeft;

        if (isTryingToPassThroughRedBoxHorizontally) {
          y.value = absoluteYCircleOrigin;
          return;
        } else if (isTryingToPassThroughRedBoxVertically) {
          x.value = absoluteXCircleOrigin;
          return;
        }

        if (didCollide) {
          if (isOnTop) {
            y.value = topYValue;
            x.value = absoluteXCircleOrigin;
          } else if (isUnder) {
            y.value = bottomYValue;
            x.value = absoluteXCircleOrigin;
          } else if (isToTheLeft) {
            y.value = absoluteYCircleOrigin;
            x.value = leftXValue;
          } else if (isToTheRight) {
            y.value = absoluteYCircleOrigin;
            x.value = rightXValue;
          }

          return;
        }
      }

      const statusBarHeight = StatusBar.currentHeight || 0;
      const hasHitTopEdge = event.absoluteY - statusBarHeight <= 0;
      const hasHitLeftEdge = event.absoluteX - RADIUS <= 0;
      const hasHitRightEdge = event.absoluteX + RADIUS >= windowWidth;
      const hasHitBottomEdge = event.absoluteY + CIRCUMFERENCE >= windowHeight;

      if (hasHitBottomEdge) {
        x.value = absoluteXCircleOrigin;
        y.value = withSpring(windowHeight - CIRCUMFERENCE - RADIUS - 4);
        return;
      }

      if (hasHitTopEdge && hasHitLeftEdge) {
        x.value = withSpring(0);
        y.value = withSpring(statusBarHeight - RADIUS - 4);
        return;
      }

      if (hasHitTopEdge && hasHitRightEdge) {
        x.value = withSpring(windowWidth - CIRCUMFERENCE);
        y.value = withSpring(statusBarHeight - RADIUS - 4);
        return;
      }

      if (hasHitTopEdge) {
        x.value = absoluteXCircleOrigin;
        y.value = withSpring(statusBarHeight - RADIUS - 4);
        return;
      }

      if (hasHitLeftEdge) {
        x.value = withSpring(0);
        y.value = absoluteYCircleOrigin;
        return;
      }

      if (hasHitRightEdge) {
        x.value = withSpring(windowWidth - CIRCUMFERENCE);
        y.value = absoluteYCircleOrigin;
        return;
      }

      x.value = absoluteXCircleOrigin;
      y.value = absoluteYCircleOrigin;
    })
    .onEnd(event => {
      if (yellowBoxXY) {
        const yellowBoxX0 = yellowBoxXY.x;
        const yellowBoxX1 = yellowBoxXY.x + YELLOW_BOX_WIDTH;

        const yellowBoxY0 = yellowBoxXY.y;
        const yellowBoxY1 = yellowBoxXY.y + YELLOW_BOX_HEIGHT;

        const cursor = {x: event.absoluteX, y: event.absoluteY};

        const square = {
          x0: yellowBoxX0,
          x1: yellowBoxX1,
          y0: yellowBoxY0,
          y1: yellowBoxY1,
        };

        if (hasCursorCollidedWith(cursor, square).didCollide) {
          x.value = withSpring(halfWidthCircleOrigin);
          const centerYOfYellowBox = yellowBoxXY.y + YELLOW_BOX_HEIGHT / 2;
          y.value = withSpring(centerYOfYellowBox - RADIUS);

          return;
        }
      }

      x.value = withSpring(halfWidthCircleOrigin);
      y.value = withSpring(initialYPosition);
    });

  const animStyles = useAnimatedStyle(() => ({
    top: y.value,
    left: x.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <View
          style={styles.yellowBox}
          onLayout={e => {
            const layout = e.nativeEvent.layout;
            setYellowBoxXY({x: layout.x, y: layout.y});
          }}>
          <Text style={styles.yellowBoxText}>DROP HERE</Text>
        </View>

        <View
          style={styles.redBox}
          onLayout={e => {
            const layout = e.nativeEvent.layout;
            setRedBoxXY({x: layout.x, y: layout.y});
          }}
        />

        <Animated.View style={[styles.circle, animStyles]} />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowBox: {
    position: 'absolute',
    width: YELLOW_BOX_WIDTH,
    height: YELLOW_BOX_HEIGHT,
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 0, 1)',
    borderRadius: 10,
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowBoxText: {
    fontSize: 16,
    color: '#777',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  redBox: {
    position: 'absolute',
    width: RED_BOX_WIDTH,
    height: RED_BOX_HEIGHT,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 1)',
    borderRadius: 10,
    bottom: '40%',
  },
  circle: {
    width: CIRCUMFERENCE,
    height: CIRCUMFERENCE,
    backgroundColor: 'purple',
    borderRadius: RADIUS,
    position: 'absolute',
  },
});
