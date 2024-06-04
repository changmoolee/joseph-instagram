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
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import SignupDragAndDropSkeletonUI from "@/components/DragAndDrop/SignupDragAndDrop/SignupDragAndDropSkeletonUI.component";

/**
 * 마이 페이지 수정
 */
export default function MyPageEdit() {
  // 업로드할 이미지 파일 상태
  const [imageFile, setImageFile] = React.useState<File[]>([]);

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
    /** 수정 프로필 이미지 데이터 */
    let imageData;

    // 수정할 프로필 이미지가 존재할 시
    if (imageFile.length > 0) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data } = imageUploadResponse;

      if (result === "fail") {
        alert("게시물 업로드에 실패했습니다.");
        return;
      }
      // S3에 업로드 된 이미지 데이터를 할당한다.
      imageData = data;
    }

    // 이미지 파일을 제외한 데이터
    const { email, name, password } = params;

    /**
     * 프로필 데이터 수정 api 호출 결과
     */
    const response: ICommonResponse = await apiClient.patch("/api/user/edit", {
      // 수정할 프로필 이미지가 존재할 시
      ...(imageData && { image: imageData }),
      email,
      name,
      password,
    });

    const { result, message } = response.data;

    // 프로필 데이터 수정이 성공적일 경우
    if (result === "success") {
      alert(message);

      // 로컬스토리지 및 전역상태에 저장되어 있는 프로필 데이터도 변경
      userInfo &&
        excuteLogin({
          ...userInfo,
          name,
          ...(imageData && { image: imageData }),
        });

      // 메인페이지 이동
      router.push("/");
    }

    // 프로필 데이터 수정이 실패했을 경우
    if (result === "fail") {
      // 에러메시지
      alert(message);
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

  return (
    <main className="w-full flex justify-center">
      <form
        className="max-w-[400px] min-w-[320px] w-full h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="w-full flex justify-center mt-10 mb-10 lg:mb-20">
          <span className="text-xl font-[600]">내정보 수정</span>
        </section>
        {/* 프로필 이미지 수정 */}
        {isLoading ? (
          <SignupDragAndDropSkeletonUI isActive={isLoading} />
        ) : (
          <SignupDragAndDrop
            className="h-[200px] lg:h-[300px]"
            prevSrc={watch("image")}
            onChange={(file) => {
              setImageFile(file);
            }}
          />
        )}

        <section className="w-full flex flex-col mt-10 gap-10">
          {isLoading ? (
            <SkeletonUI
              isActive={isLoading}
              isCircle
              className="w-full h-[24px]"
            />
          ) : (
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
          )}
          {/* 이름 수정 */}
          {isLoading ? (
            <SkeletonUI
              isActive={isLoading}
              isCircle
              className="w-full h-[24px]"
            />
          ) : (
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
          )}
          {/* 비밀번호 수정 */}
          {isLoading ? (
            <SkeletonUI
              isActive={isLoading}
              isCircle
              className="w-full h-[24px]"
            />
          ) : (
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
          )}
          {/* 비밀번호 확인 수정 */}
          {isLoading ? (
            <SkeletonUI
              isActive={isLoading}
              isCircle
              className="w-full h-[24px]"
            />
          ) : (
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
                <span className="text-[red]">
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </article>
          )}
        </section>

        <ColorButton
          text="수정하기"
          className="w-full h-[40px] mt-10 bg-sky-400 text-[white]"
        />
      </form>
    </main>
  );
}
