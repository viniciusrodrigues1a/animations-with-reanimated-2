import React from 'react';
import {icons} from './Icons';
import {SvgProps} from './Icons/types';

type IconProps = {
  name: keyof typeof icons;
  size: number;
  color: string;
};

export const Icon = ({name, size, color}: IconProps) => {
  const IconComponent = icons[name] as (props: SvgProps) => JSX.Element;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent color={color} size={size} />;
};
