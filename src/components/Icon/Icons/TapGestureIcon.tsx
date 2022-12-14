import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from './types';

export const TapGestureIcon = ({color, size}: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 150 150" fill="none">
    <Path
      d="M44.495 52.99c7.453 0 13.495-6.042 13.495-13.495C57.99 32.042 51.948 26 44.495 26 37.042 26 31 32.042 31 39.495c0 7.453 6.042 13.495 13.495 13.495z"
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M118.702 100.038c0 7.774-33.646 26.632-36.665 23.753-2.187-2.085-17.858-23.828-37.96-14.971-3.594 1.583-4.393-5.327-3.594-8.782.852-3.68 2.876-5.764 6.327-7.341 6.613-3.024 16.679-3.312 16.679-5.183 0-1.872-24.012-43.186-24.444-45.058-.7-3.042-.671-5.963 1.87-7.773 2.853-2.034 6.583-.867 8.77 1.871 1.15 1.44 19.843 33.432 21.568 33.83 1.726.397 20.32-9.876 26.6-7.63 6.039 2.16 20.849 29.51 20.849 37.284z"
      fill="#fff"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);
