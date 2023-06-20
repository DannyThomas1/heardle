import { useEffect, useState } from "react";

export default function useDebounce(
  value = "",
  delay: number | undefined,
  callback = () => {
    // empty arrow function. this comment is to satisfy the linter
  }
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback();
    }, delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [value]);

  return debouncedValue;
}
