export type ShapeElement = PopulatedShape | EmptyShape;

export type PopulatedShape = {
  id: string;
  populated: true;
  width: number;
  height: number;
  x: number;
  y: number;
  isSelected: boolean;
};

export type EmptyShape = {
  id: string;
  populated: false;
};
