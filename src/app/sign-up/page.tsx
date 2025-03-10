"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import SignupDragAndDrop from "@/components/DragAndDrop/SignupDragAndDrop/SignupDragAndDrop.component";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { ImageUpload } from "@/utils/services/upload";
import apiClient from "@/utils/axios";
import InputSection from "@/components/InputSection/InputSection.component";
import { IUser } from "@/typescript/user.interface";

interface FormValues extends IUser {
  password: string;
  verifyPassword: string;
}

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
  } = useForm<FormValues>();

  /**
   * 회원가입 함수
   */
  const signUp = async (params: FormValues) => {
    let imageApiResult;
    let imageApiData;

    // 이미지가 있을 경우, 이미지 API 호출
    if (imageFile?.length) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data } = imageUploadResponse;

      // API 호출 실패시 중단
      if (result === "failure") {
        alert("유저 이미지 업로드에 실패했습니다. 관리자에게 문의해 주세요.");
        return;
      }

      imageApiResult = result;
      imageApiData = data;
    }

    const { email, username, password } = params;

    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signup`,
      {
        ...(imageApiData && { image: imageApiData }),
        email,
        username,
        password,
      }
    );

    const { result, message } = response.data;

    if (result === "success") {
      alert("회원가입에 성공하였습니다. 서비스 이용을 원할시 로그인해주세요.");

      // 메인페이지 이동
      router.push("/");
    }

    if (result === "failure") {
      // 에러메시지
      alert(message);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp(data);
  };

  return (
    <main className="flex w-full justify-center pb-20 pt-10">
      <form
        className="flex h-full w-full max-w-[400px] flex-col gap-5 px-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="mt-10 flex w-full justify-center">
          <span className="text-xl font-[600]">회원가입</span>
        </section>
        <SignupDragAndDrop
          className="mt-10 h-[150px] lg:h-[200px]"
          onChange={(file) => {
            setImageFile(file);
          }}
        />
        <section className="mt-5 flex w-full flex-col gap-5">
          <article className="w-full gap-5">
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
              label="이름"
              placeholder="홍길동"
              register={register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-[red]">이름을 입력해 주세요.</span>
            )}
          </article>
          <article className="w-full gap-5">
            <InputSection
              label="비밀번호"
              type="password"
              placeholder="password"
              register={register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-[red]">비밀번호를 입력해 주세요.</span>
            )}
          </article>
          <article className="w-full gap-5">
            <InputSection
              label="비밀번호 확인"
              type="password"
              placeholder="verify password"
              register={register("verifyPassword", {
                required: true,
                validate: (v) => watch("password") == v,
              })}
            />
            {errors.verifyPassword && (
              <span className="text-[red]">비밀번호가 일치하지 않습니다.</span>
            )}
          </article>
        </section>
        <ColorButton
          text="가입하기"
          className="mt-10 flex h-[40px] w-full items-center justify-center bg-blue-500"
        />
      </form>
    </main>
  );
}
