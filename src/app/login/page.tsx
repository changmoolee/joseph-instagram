"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { getUserData } from "@/utils/services/user";
import { useLoginStore } from "@/store/useLoginStore";
import apiClient from "@/utils/axios";
import InputSection from "@/components/InputSection/InputSection.component";

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

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  /**
   * 로그인 함수
   */
  const signIn = async (data: any) => {
    // 객체분해할당
    const { email, password } = data;

    const signInResponse: ICommonResponse = await apiClient.post(
      "/api/auth/sign-in",
      {
        email,
        password,
      }
    );

    const { result, message } = signInResponse.data;

    if (result === "success") {
      const userProfileResponse = await getUserData();

      const { result: userProfileResult, data: userProfileData } =
        userProfileResponse;

      if (userProfileResult === "success" && userProfileData) {
        // 로그인 전역상태
        excuteLogin(userProfileData);
        // 메인페이지로 이동
        router.push("/");
      } else {
        alert(
          "유저의 프로필 데이터를 불러오는데 실패하였습니다. 관리자에게 문의해주세요."
        );
      }
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
    <main className="flex h-full w-full flex-col items-center pt-10">
      <section className="my-10 flex w-full justify-center">
        <h1 className="text-2xl font-semibold">로그인</h1>
      </section>
      <div className="w-full min-w-[320px] max-w-[400px]">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="mt-5 w-full gap-5">
            <InputSection
              label="이메일"
              placeholder="abc1234@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-[red]">이메일을 입력해 주세요.</span>
            )}
          </article>
          <article className="w-full gap-5">
            <InputSection
              label="비밀번호"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-[red]">비밀번호를 입력해 주세요.</span>
            )}
          </article>
          <button className="mt-10 flex h-[40px] w-full items-center justify-center rounded-md bg-blue-500 font-[600] text-[#fff]">
            로그인
          </button>
        </form>
        <Link href="/sign-up">
          <button className="mt-3 flex h-[40px] w-full items-center justify-center rounded-md bg-orange-500 font-[600] text-[#fff]">
            회원가입
          </button>
        </Link>
      </div>
    </main>
  );
}
