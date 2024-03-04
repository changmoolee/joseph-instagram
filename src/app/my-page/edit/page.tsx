"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import SignupDragAndDrop from "@/components/DragAndDrop/SignupDragAndDrop/SignupDragAndDrop.component";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ICommonResponse } from "../../../../typescript/common/response.interface";

interface IUserData {
  image: string;
  _id: string;
  email: string;
  name: string;
}
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

  /**
   * 유저 개인 데이터 호출
   */
  const getUserData = async () => {
    // 객체분해할당

    const response: ICommonResponse<IUserData> = await axios.get(
      `/api/user/my-page`,
      {
        withCredentials: true,
      }
    );

    const { result, data, message } = response.data;

    setValue("email", data?.email);
    setValue("name", data?.name);
    setValue("image", data?.image);

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  /**
   * 유저 데이터 수정
   */
  const updateUser = async (params: any) => {
    // 객체분해할당
    const { email, name, password } = params;

    const response: ICommonResponse = await axios.patch("/api/user/edit", {
      email,
      name,
      password,
    });

    const { result, message } = response.data;

    if (result === "success") {
      alert(message);

      // 메인페이지 이동
      router.push("/");
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  const onSubmit = (data: any) => {
    updateUser(data);
  };

  React.useEffect(() => {
    getUserData();
  }, []);

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
          prevSrc={watch("image") || "/images/user.png"}
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
          text="수정하기"
          className="w-full h-[40px] mt-10 bg-sky-400 text-[white]"
        />
      </form>
    </main>
  );
}
