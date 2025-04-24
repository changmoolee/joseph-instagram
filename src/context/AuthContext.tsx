"use client";

import { useLoginStore } from "@/store/useLoginStore";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode } from "react";

type AuthContextType = {
  isChecked: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // router
  const router = useRouter();

  // 로그인 전역상태
  const { isLogin } = useLoginStore();

  // effect 훅으로 로그인 상태 - 체크 여부
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (!isLogin) {
      router.replace("/");
    } else {
      setIsChecked(true);
    }
  }, [isLogin, router]);

  if (!isChecked) return null; // 렌더링 막기

  return (
    <AuthContext.Provider value={{ isChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
