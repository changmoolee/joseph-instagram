"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { getUserData } from "@/utils/services/user";
import { useLoginStore } from "@/store/useLoginStore";
import apiClient from "@/utils/axios";
import InputSection from "@/components/InputSection/InputSection.component";
import { IUser } from "@/typescript/user.interface";

// https://react-hook-form.com/ts
interface FormValues {
  email: string;
  password: string;
}

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
  } = useForm<FormValues>();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  /**
   * 로그인 함수
   */
  const signIn = async (data: FormValues) => {
    // 객체분해할당
    const { email, password } = data;

    const signInResponse: ICommonResponse<IUser> = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signin`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const { result, data: responseData, message } = signInResponse.data;

    if (result === "success" && responseData) {
      // 로그인 전역상태
      excuteLogin({
        id: responseData.id,
        email: responseData.email,
        image: responseData.image,
        username: responseData.username,
      });
      // 메인페이지로 이동
      router.push("/");
    }

    if (result === "failure") {
      // 에러메시지
      alert(message);
      // 비밀번호 초기화
      setValue("password", "");
    }
  };

  // 유효성 검사 통과시 실행될 함수
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signIn(data);
  };

  return (
    <main className="flex h-full w-full flex-col items-center pt-10">
      <section className="my-10 flex w-full justify-center">
        <h1 className="text-2xl font-semibold">로그인</h1>
      </section>
      <div className="w-full max-w-[400px] px-[20px]">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="mt-5 w-full gap-5">
            <InputSection
              label="이메일"
              placeholder="abc1234@gmail.com"
              register={register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-[red]">이메일을 입력해 주세요.</span>
            )}
          </article>
          <article className="w-full gap-5">
            <InputSection
              type="password"
              label="비밀번호"
              placeholder="password"
              register={register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-[red]">비밀번호를 입력해 주세요.</span>
            )}
          </article>
          <button
            type="submit"
            className="mt-10 flex h-[40px] w-full items-center justify-center rounded-md bg-blue-500 font-[600] text-[#fff]"
          >
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
