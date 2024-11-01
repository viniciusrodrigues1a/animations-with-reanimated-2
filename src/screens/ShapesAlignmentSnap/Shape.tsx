import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ShapeElement, EmptyShape} from './types';

type ShapeProps = {
  data: ShapeElement;
};

export const Shape = ({data}: ShapeProps) => {
  const isShapeEmpty = (s: ShapeElement): s is EmptyShape => {
    return !s.populated;
  };

  const populateData = () => {};

  if (isShapeEmpty(data)) {
    return null;
  }

  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: 'green',
  },
});
