"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { vefifyPassword } from "@/utils/services/user";
import { useLoginStore } from "@/store/useLoginStore";
import { useEditVerificationStore } from "@/store/useEditVerificationStore";

export interface IVerifyPasswordFormValues {
  password: string;
}

/**
 * 비밀번호 재입력 인증 페이지
 */
export default function VerifyPassword() {
  // router
  const router = useRouter();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  /** 비밀번호 재입력 인증 여부 전역 상태 데이터 */
  const { setIsVerified } = useEditVerificationStore();

  const [isSocialLogin, setIsSocialLogin] = React.useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IVerifyPasswordFormValues>({
    values: {
      password: "",
    },
  });

  /**
   * 비밀번호 재입력 인증
   */
  const verifyPassword = async (params: IVerifyPasswordFormValues) => {
    // 이미지 파일을 제외한 데이터
    const { password } = params;

    /**
     * 비밀번호 재입력 인증 api 호출 결과
     */
    const response = await vefifyPassword({ password });

    const { result, message } = response;

    // 비밀번호 재입력 인증이 성공적일 경우
    if (result === "success") {
      alert(message);

      // 비밀번호 재입력 인증 전역상태 - true
      setIsVerified(true);
      // 메인페이지 이동
      router.push("/my-page/edit");
    }

    // 비밀번호 재입력 인증이 실패했을 경우
    if (result === "failure") {
      // 에러메시지
      alert(message);
    }
  };

  const onSubmit = (data: IVerifyPasswordFormValues) => {
    verifyPassword(data);
  };

  React.useEffect(() => {
    if (!userInfo) {
      return;
    }

    /* provider 가 null 이면
       소셜로그인이 아닌 '일반 로그인'이므로 비밀번호 재인증 필요 */
    if (userInfo.provider === null) {
      setIsSocialLogin(false);
    } else {
      // 소셜로그인 이라면, 비밀번호 재입력 인증 전역상태 - true
      setIsVerified(true);
      // 내정보수정 페이지로 이동
      router.push("/my-page/edit");
    }
  }, [userInfo, router, setIsVerified]);

  return (
    <main className="flex w-full justify-center">
      {/* 소셜로그인이 아닐때 활성화 */}
      {!isSocialLogin && (
        <form
          className="flex h-full w-full max-w-[400px] flex-col px-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="mt-10 flex w-full justify-center">
            <span className="text-xl font-[600]">비밀번호 재인증</span>
          </section>

          <section className="mt-10 flex w-full flex-col gap-10">
            <span className="text-sm">
              내정보수정을 위해서 비밀번호 재인증이 필요합니다.
            </span>

            {/* 비밀번호 입력 */}
            <article className="w-full gap-5">
              <section className="flex w-full">
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
          </section>

          <ColorButton
            text="인증"
            className="mt-10 h-[40px] w-full bg-blue-500"
          />
        </form>
      )}
    </main>
  );
}
