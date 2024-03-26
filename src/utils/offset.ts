export type Offset = {
  top?: number;
  right?: number;
  left?: number;
  down?: number;
};

//Appends px to each value in the object
export function toPxObject(offset: Offset) {
  return Object.fromEntries(
    Object.entries(offset).map(([key, value]) => [key, `${value}px`])
  );
}
