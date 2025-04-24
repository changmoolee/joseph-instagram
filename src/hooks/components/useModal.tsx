import { useState } from "react";

export function useModal() {
  const [message, setMessage] = useState("");

  const openModal = (message: string) => {
    setMessage(message);
  };

  const closeModal = () => setMessage("");

  return { isOpen: !!message, message, openModal, closeModal };
}
