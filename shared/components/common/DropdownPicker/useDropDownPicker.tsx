import { useState } from "react";

export function useDropDownPicker() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
}
