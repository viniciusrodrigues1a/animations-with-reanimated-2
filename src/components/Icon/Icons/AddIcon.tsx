import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from './types';

export const AddIcon = ({color, size}: SvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path d="M12 5L12 19" />
    <Path d="M5 12L19 12" />
  </Svg>
);
