import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Shape} from './Shape';
import {Icon} from '../../components/Icon';
import {IndicatorLine} from './IndicatorLine';
import {ShapeElement} from './types';

export const ShapesAlignmentSnap = () => {
  const [shapes, setShapes] = useState<ShapeElement[]>([
    {
      id: '1',
      populated: false,
    },
  ]);

  const updateShape = (id: string) => {
    console.log(id);
  };

  return (
    <View style={styles.wrapperView}>
      {shapes.map(s => (
        <Shape data={s} />
      ))}

      <IndicatorLine direction="vertical" />
      <IndicatorLine direction="horizontal" />

      <TouchableOpacity style={styles.fab}>
        <Icon name="Add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  fab: {
    position: 'absolute',
    backgroundColor: 'green',
    borderRadius: 64,
    width: 64,
    height: 64,
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
