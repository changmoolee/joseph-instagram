"use client";

import React from "react";

interface IToastProvider {
  message: string;
  isOpen: boolean;
  openToast: (message: string) => void;
  closeToast: () => void;
}

const ToastContext = React.createContext<IToastProvider | null>(null);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [fade, setFade] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const closeToast = () => {
    setFade(true); // fade-out 시작

    setTimeout(() => {
      setIsOpen(false);
      setFade(false); // 초기화
      setMessage("");
    }, 500);
  };

  const openToast = (msg: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    } // 기존 타이머 정리

    setMessage(msg);
    setIsOpen(true);

    timerRef.current = setTimeout(() => {
      closeToast();
    }, 3000); // 3초 후 자동 닫힘
  };

  return (
    <ToastContext.Provider value={{ message, isOpen, openToast, closeToast }}>
      {isOpen && (
        <div
          className={`fixed bottom-10 left-1/3 z-50 -translate-x-1/2 cursor-pointer rounded-lg bg-black px-4 py-2 text-white shadow-lg ${fade ? "animate-fade-out" : ""}`}
          onClick={closeToast}
        >
          {message}
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
