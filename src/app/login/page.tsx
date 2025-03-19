"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginStore } from "@/store/useLoginStore";
import InputSection from "@/components/InputSection/InputSection.component";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import { signIn } from "@/utils/services/user";

// https://react-hook-form.com/ts
export interface ISignInFormValues {
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
  } = useForm<ISignInFormValues>();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  /**
   * 로그인 함수
   */
  const signInApi = async (data: ISignInFormValues) => {
    const signInResponse = await signIn(data);

    const { result, data: responseData, message } = signInResponse;

    if (result === "success" && responseData) {
      // 로그인 전역상태
      excuteLogin({
        id: responseData.id,
        email: responseData.email,
        image_url: responseData.image_url,
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
  const onSubmit: SubmitHandler<ISignInFormValues> = (data) => {
    signInApi(data);
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
          <ColorButton
            text="로그인"
            type="submit"
            className="mt-10 h-[40px] w-full bg-blue-500"
          />
        </form>
        <Link href="/sign-up">
          <ColorButton
            text="회원가입"
            className="mt-3 h-[40px] w-full bg-orange-500"
          />
        </Link>
      </div>
    </main>
  );
}
