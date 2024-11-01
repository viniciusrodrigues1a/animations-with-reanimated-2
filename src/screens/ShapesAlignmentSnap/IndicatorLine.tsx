import React from 'react';
import {StyleSheet, View} from 'react-native';

type IndicatorLineProps = {
  direction: 'vertical' | 'horizontal';
};

export const IndicatorLine = ({direction}: IndicatorLineProps) => (
  <View style={styles[direction]} />
);

const styles = StyleSheet.create({
  vertical: {
    height: 9999,
    width: 2,
    left: '50%',
    transform: [{translateX: -1}],
    backgroundColor: 'red',
    position: 'absolute',
  },
  horizontal: {
    width: 9999,
    height: 2,
    top: '50%',
    transform: [{translateY: -1}],
    backgroundColor: 'red',
    position: 'absolute',
  },
});
