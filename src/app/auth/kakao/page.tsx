"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useLoginStore } from "@/store/useLoginStore";
import { authKakao, authKakaoSignup } from "@/utils/services/auth/kakao";
import { SubmitHandler, useForm } from "react-hook-form";
import { IKakaoSignInResult } from "@/typescript/auth.interface";
import ColorButton from "@/components/ColorButton/ColorButton.component";

interface ISearchParams {
  /** 토큰 받기 요청에 필요한 인가 코드 */
  code: string;
  /** 인증 실패 시 반환되는 에러 코드 */
  error: string;
  /** 인증 실패 시 반환되는 에러 메시지 */
  error_description: string;
  state: string;
}

export interface IEmailFormValues {
  email: string;
}

export default function AuthKakaoPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { code, error, error_description } = searchParams;

  const router = useRouter();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEmailFormValues>();

  const [kakaoUserinfo, setKakaoUserinfo] =
    React.useState<IKakaoSignInResult>();

  React.useEffect(() => {
    if (!code || error) {
      return;
    }

    const handleKakaoAuth = async () => {
      try {
        const authKakaoResponse = await authKakao({ code });

        const { result, data: responseData, message } = authKakaoResponse;

        if (result === "success" && responseData) {
          /**
           * 응답값에 토큰이 존재할 경우, 로그인 처리
           */
          if ("token" in responseData) {
            // 로그인 전역상태
            excuteLogin({
              id: responseData.id,
              email: responseData.email,
              image_url: responseData.image_url,
              username: responseData.username,
            });
            // 메인페이지로 이동
            router.push("/");
          } else {
            /**
             * 응답값에 토큰이 없을 경우, 회원가입을 위한 회원정보를 상태에 저장
             */
            setKakaoUserinfo(responseData);
          }
        }

        if (result === "failure") {
          // 에러메시지
          alert(message);
        }
      } catch (error) {
        console.error("kakao 로그인 실패", error);
      }
    };

    handleKakaoAuth();
  }, [code, router]);

  /**
   * 카카오 소셜로그인 - 회원가입 submit
   */
  const onSubmit: SubmitHandler<IEmailFormValues> = async (
    data: IEmailFormValues
  ) => {
    if (!confirm("정확한 이메일주소를 입력하셨나요?")) {
      return;
    }

    if (!kakaoUserinfo) {
      throw new Error(
        "카카오 유저 정보가 없습니다. 새로고침 후 다시 시도해주세요."
      );
    }

    // 카카오로부터 받아온 회원정보 상태값
    const { provider_id, image_url, username } = kakaoUserinfo;

    /** 카카오 소셜 로그인 - 회원가입 api 응답값 */
    const kakaoSignupResponse = await authKakaoSignup({
      email: data.email,
      provider_id: provider_id.toString(), // 모든 provider_id는 string으로 통일
      image_url,
      username,
    });

    const { result, data: signuResponseData, message } = kakaoSignupResponse;

    if (result === "success" && signuResponseData) {
      // 로그인 전역상태
      excuteLogin({
        id: signuResponseData.id,
        email: signuResponseData.email,
        image_url: signuResponseData.image_url,
        username: signuResponseData.username,
      });
      // 메인페이지로 이동
      router.push("/");
    }

    if (result === "failure") {
      // 에러메시지
      alert(message);
    }
  };

  // 카카오 인증 실패 시
  if (!code || error) {
    return (
      <span>
        {error_description || "카카오 로그인 중 에러가 발생하였습니다."}
      </span>
    );
  }

  return (
    <main>
      {/* 회원 정보가 있을 경우, 이메일 입력을 위한 폼을 보여줍니다. */}
      {kakaoUserinfo ? (
        <form
          className="flex h-[200px] w-full flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <article className="flex h-[40px] gap-5">
              <input
                className="w-[200px] border p-2"
                placeholder="abc1234@gmail.com"
                {...register("email", { required: true })}
              />
              <ColorButton
                type="submit"
                text="등록"
                className="flex h-full w-[50px] items-center justify-center bg-blue-500"
              />
            </article>
            {errors.email && (
              <span className="text-[red]">이메일을 입력해 주세요.</span>
            )}
          </div>
        </form>
      ) : (
        // 카카오 소셜 로그인
        <p className="py-10 text-center">로그인 처리 중입니다...</p>
      )}
    </main>
  );
}
