import { useState } from 'react';

export function useBoolean(initalValue: boolean = false) {
  const [value, setValue] = useState(initalValue);
  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}
