"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ICommonResponse } from "../../../typescript/common/response.interface";

interface LoginState {
  isLogin: boolean;
  token: string;
  excuteLogin: () => void;
  excuteLogout: () => void;
}

/** 로그인 전역상태 */
export const useLoginStateStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogin: false,
      token: "",
      excuteLogin: () => set({ isLogin: true }),
      excuteLogout: () => set({ isLogin: false }),
    }),
    {
      name: "user-auth", // 로컬 스토리지에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 종류를 지정 (여기서는 localStorage)
    }
  )
);
// zustand middleware 사용하기

/**
 * 로그인 페이지
 */
export default function Login() {
  /** router */
  const router = useRouter();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const excuteLogin = useLoginStateStore((state) => state.excuteLogin);

  /**
   * 로그인 함수
   */
  const signIn = async (data: any) => {
    // 객체분해할당
    const { email, password } = data;

    const response: ICommonResponse = await axios.post("/api/auth/sign-in", {
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
      setValue("password", "");
    }
  };

  // 유효성 검사 통과시 실행될 함수
  const onSubmit = (data: any) => {
    signIn(data);
  };

  return (
    <main className="w-full h-full flex flex-col items-center">
      <section className="w-full flex justify-center my-10">
        <span className="text-xl font-[600]">로그인</span>
      </section>
      <form
        className="w-[400px] flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="w-full mt-5 gap-5">
          <section className="w-full flex">
            <span className="w-[120px]">이메일</span>
            <input
              className="w-full"
              placeholder="abc1234@gmail.com"
              {...register("email", { required: true })}
            />
          </section>
          {errors.email && (
            <span className="text-[red]">이메일을 입력해 주세요.</span>
          )}
        </article>
        <article className="w-full mt-5 gap-5">
          <section className="w-full flex">
            <span className="w-[120px]">비밀번호</span>
            <input
              className="w-full"
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </section>
          {errors.password && (
            <span className="text-[red]">비밀번호를 입력해 주세요.</span>
          )}
        </article>
        <button className="w-full h-[30px] flex justify-center items-center mt-10 text-[#fff] font-[600] bg-blue-500">
          로그인
        </button>
      </form>
      <Link href="/sign-up">
        <button className="w-[400px] h-[30px] flex justify-center items-center mt-5 text-[#fff] font-[600] bg-orange-500">
          회원가입
        </button>
      </Link>
    </main>
  );
}
