"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import SignupDragAndDrop from "@/components/DragAndDrop/SignupDragAndDrop/SignupDragAndDrop.component";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { ImageUpload } from "@/utils/services/upload";
import apiClient from "@/utils/axios";
import { useLoginStore } from "@/store/useLoginStore";
import { useGetMyData } from "@/hooks/user/useGetMyData";
import Loading from "@/components/Loading/Loading.component";

/**
 * 마이 페이지 수정
 */
export default function MyPageEdit() {
  const [imageFile, setImageFile] = React.useState<File[]>();

  // router
  const router = useRouter();

  // useForm
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /** 로그인 전역 상태 데이터 */
  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  /**
   * 유저 데이터 수정
   */
  const updateUser = async (params: any) => {
    // 이미지 업 로드
    if (imageFile) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data } = imageUploadResponse;

      if (result === "success") {
        // 객체분해할당
        const { email, name, password } = params;

        const response: ICommonResponse = await apiClient.patch(
          "/api/user/edit",
          {
            image: data,
            email,
            name,
            password,
          }
        );

        const { result, message } = response.data;

        if (result === "success") {
          alert(message);

          // 로컬스토리지 및 전역상태에 저장되어 있는 프로필 데이터도 변경
          userInfo &&
            excuteLogin({ ...userInfo, name, ...(data && { image: data }) });

          // 메인페이지 이동
          router.push("/");
        }

        if (result === "fail") {
          // 에러메시지
          alert(message);
        }
      } else {
        alert("게시물 업로드에 실패했습니다.");
      }
    }
  };

  const onSubmit = (data: any) => {
    updateUser(data);
  };

  // 유저 프로필 데이터 호출
  const { isLoading, data: userInfo, error, message } = useGetMyData();

  React.useEffect(() => {
    // 에러시
    if (error) {
      alert(message);
    }

    setValue("email", userInfo?.email);
    setValue("name", userInfo?.name);
    setValue("image", userInfo?.image);
  }, [userInfo, setValue, error, message]);

  // 로딩일 경우 로딩 컴포넌트
  if (isLoading) {
    return <Loading isActive={isLoading} className="mx-auto mt-5" />;
  }

  return (
    <main className="w-full flex justify-center">
      <form
        className="w-[400px] flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="w-full flex justify-center my-10">
          <span className="text-xl font-[600]">내정보 수정</span>
        </section>
        <SignupDragAndDrop
          prevSrc={watch("image")}
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
                {...register("password", { required: false })}
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
                  validate: (v) => watch("password") == v,
                  disabled: !watch("password"),
                })}
              />
            </section>
            {errors.verifyPassword && (
              <span className="text-[red]">비밀번호가 일치하지 않습니다.</span>
            )}
          </article>
        </section>
        <ColorButton
          text="수정하기"
          className="w-full h-[40px] mt-10 bg-sky-400 text-[white]"
        />
      </form>
    </main>
  );
}
