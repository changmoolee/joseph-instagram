"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { create } from "zustand";

interface LoginState {
  isLogin: boolean;
  token: string;
}
interface LoginAction {
  excuteLogin: () => void;
  excuteLogout: () => void;
}

/** 로그인 전역상태 */
const useLoginStateStore = create<LoginState & LoginAction>((set) => ({
  isLogin: false,
  token: "",
  excuteLogin: () => set(() => ({ isLogin: true })),
  excuteLogout: () => set(() => ({ isLogin: false })),
}));
// zustand middleware 사용하기

/**
 * 로그인 페이지
 */
export default function Login() {
  /** router */
  const router = useRouter();

  const excuteLogin = useLoginStateStore((state) => state.excuteLogin);

  // 메일주소
  const [email, setEmail] = React.useState<string>("");
  // 비밀번호
  const [password, setPassword] = React.useState<string>("");

  /**
   * 로그인 함수
   */
  const signIn = async () => {
    const response = await axios.post("/api/auth/sign-in", {
      email,
      password,
    });

    const { result, message } = response.data;

    if (result === "success") {
      // 로그인 전역상태
      excuteLogin();
      // 메인페이지로 이동
      router.push("/");
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
      // 비밀번호 초기화
      setPassword("");
    }
  };

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <section className="w-[600px] flex flex-col gap-5">
        <article className="w-full flex items-center mt-5 gap-5">
          <span className="w-[80px]">이메일</span>
          <input
            className="w-full"
            placeholder="abc1234@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </article>
        <article className="w-full flex items-center mt-5 gap-5">
          <span className="w-[80px]">비밀번호</span>
          <input
            className="w-full"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </article>
        <button
          className="w-full flex justify-center items-center text-[#fff] font-[600] bg-blue-500"
          onClick={signIn}
        >
          로그인
        </button>
      </section>
    </main>
  );
}
