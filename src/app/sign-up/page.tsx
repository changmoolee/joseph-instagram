"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import SignupDragAndDrop from "@/components/DragAndDrop/SignupDragAndDrop/SignupDragAndDrop.component";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ICommonResponse } from "../../../typescript/common/response.interface";

/**
 * 회원가입 페이지
 */
export default function SignUp() {
  const [imageFile, setImageFile] = React.useState<File[]>();

  // router
  const router = useRouter();

  // useForm
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /**
   * 회원가입 함수
   */
  const signUp = async (params: any) => {
    // 객체분해할당
    const { email, name, password } = params;

    const response: ICommonResponse = await axios.post("/api/auth/sign-up", {
      email,
      name,
      password,
    });

    const { result, message } = response.data;

    if (result === "success") {
      alert("회원가입에 성공하였습니다. 서비스 이용을 원할시 로그인해주세요.");

      // 메인페이지 이동
      router.push("/");
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  const onSubmit = (data: any) => {
    signUp(data);
  };

  return (
    <main className="w-full flex justify-center">
      <form
        className="w-[400px] flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="w-full flex justify-center my-10">
          <span className="text-xl font-[600]">회원가입</span>
        </section>
        <SignupDragAndDrop
          onChange={(file) => {
            setImageFile(file);
          }}
        />
        <section className="w-full flex flex-col gap-10">
          <article className="w-full gap-5">
            <section className="w-full flex">
              <span className="w-[200px]">이메일</span>
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
          <article className="w-full gap-5">
            <section className="w-full flex">
              <span className="w-[200px]">이름</span>
              <input
                className="w-full"
                placeholder="홍길동"
                {...register("name", { required: true })}
              />
            </section>
            {errors.name && (
              <span className="text-[red]">이름을 입력해 주세요.</span>
            )}
          </article>
          <article className="w-full gap-5">
            <section className="w-full flex">
              <span className="w-[200px]">비밀번호</span>
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
          <article className="w-full gap-5">
            <section className="w-full flex">
              <span className="w-[200px]">비밀번호 확인</span>
              <input
                className="w-full"
                type="password"
                placeholder="verify password"
                {...register("verifyPassword", {
                  required: true,
                  validate: (v) => watch("password") == v,
                })}
              />
            </section>
            {errors.verifyPassword && (
              <span className="text-[red]">비밀번호가 일치하지 않습니다.</span>
            )}
          </article>
        </section>
        <ColorButton
          text="가입하기"
          className="w-full h-[40px] mt-10 bg-sky-400 text-[white]"
        />
      </form>
    </main>
  );
}
