import { useState } from "react";

const useHook = () => {
  const [isOpen, setisOpen] = useState(false);

  const onOpen = () => {
    setisOpen(true);
  };
  const onClose = () => {
    setisOpen(false);
  };
  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useHook;
