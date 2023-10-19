import { useState } from "react";

export default function useToggle() {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = () => setIsShown(!isShown);

  return {
    isShown,
    toggle,
  };
}
