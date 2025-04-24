"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useLoginStore } from "@/store/useLoginStore";
import { authKakao, authKakaoSignup } from "@/utils/services/auth/kakao";
import { SubmitHandler, useForm } from "react-hook-form";
import { IKakaoSignInResult } from "@/typescript/auth.interface";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import { sendAuthCode, verifyAuthCode } from "@/utils/services/auth/auth-code";
import { useModal } from "@/hooks/components/useModal";
import AlertModal from "@/components/AlertModal/AlertModal.component";
import Loading from "@/components/Loading/Loading.component";

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

export interface IAuthCodeFormValues {
  code: string;
}

export default function AuthKakaoPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { code, error, error_description } = searchParams;

  const router = useRouter();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  const { isOpen, message, openModal, closeModal } = useModal();

  const {
    register: emailRegister,
    formState: { errors: emailErrors },
    watch: emailWatch,
    handleSubmit: emailHandleSubmit,
  } = useForm<IEmailFormValues>();

  const {
    register: authCodeRegister,
    formState: { errors: authCodeErrors },
    handleSubmit: authCodeHandleSubmit,
  } = useForm<IAuthCodeFormValues>();

  const [kakaoUserinfo, setKakaoUserinfo] =
    React.useState<IKakaoSignInResult>();

  const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);

  const [showAuthCodeInput, setShowAuthCodeInput] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!code || error) {
      return;
    }

    const handleKakaoAuth = async () => {
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
        console.error("kakao 로그인 실패", error);
        // 메인페이지로 이동
        router.push("/");
      }
    };

    handleKakaoAuth();
  }, [code, router]);

  /**
   * 카카오 소셜로그인 - 이메일 인증코드 발송
   */
  const onSubmitEmail: SubmitHandler<IEmailFormValues> = async (
    data: IEmailFormValues
  ) => {
    if (!confirm("정확한 이메일주소를 입력하셨나요?")) {
      return;
    }

    // 이메일 확정
    setIsEmailConfirmed(true);

    const authCodeResponse = await sendAuthCode({ email: data.email });

    const { result, message } = authCodeResponse;

    if (result === "success") {
      openModal(message);
      // 인증코드 입력 input창 생성
      setShowAuthCodeInput(true);
    }

    if (result === "failure") {
      // 에러메시지
      openModal(message);
    }
  };

  /**
   * 카카오 소셜로그인 - 인증코드 확인
   */
  const onSubmitAuthCode: SubmitHandler<IAuthCodeFormValues> = async (
    data: IAuthCodeFormValues
  ) => {
    // 인증 코드 확인 api
    const authCodeResponse = await verifyAuthCode({
      email: emailWatch("email"),
      code: data.code,
    });

    const { result, message } = authCodeResponse;

    // 인증코드 확인 성공시 회원가입을 한다.
    if (result === "success") {
      if (!kakaoUserinfo) {
        openModal("카카오 유저 정보가 없습니다. 다시 로그인을 진행해주세요.");
        router.push("/");
        return;
      }

      // 카카오로부터 받아온 회원정보 상태값
      const { provider_id, image_url, username } = kakaoUserinfo;

      /** 카카오 소셜 로그인 - 회원가입 api 응답값 */
      const kakaoSignupResponse = await authKakaoSignup({
        email: emailWatch("email"),
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
        openModal("카카오 로그인이 완료되었습니다!");
        // 메인페이지로 이동
        router.push("/");
      }
      if (result === "failure") {
        // 에러메시지
        message && openModal(message);
      }
    }

    if (result === "failure") {
      // 에러메시지
      openModal(message);
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
        <div>
          {/* 1. 이메일 입력 폼 */}
          <form
            className="flex h-[200px] w-full flex-col items-center justify-center"
            onSubmit={emailHandleSubmit(onSubmitEmail)}
          >
            <section>
              <article className="flex flex-col whitespace-pre-wrap">
                <span className="text-[20px]">💬 이메일 주소가 필요해요.</span>
                <p className="mt-[10px] text-[14px]">{`카카오 소셜 로그인을 이용하시려면,\n사용가능한 이메일 주소를 인증하세요.`}</p>
              </article>
              <article className="mt-[20px]">
                <article className="flex h-[40px] gap-5">
                  <input
                    className="w-[200px] border p-2"
                    placeholder="abc1234@gmail.com"
                    disabled={isEmailConfirmed} // 이메일 발송 이후 변경 불가
                    {...emailRegister("email", { required: true })}
                  />
                  <ColorButton
                    type="submit"
                    text="다음"
                    className={`flex h-full w-[50px] items-center justify-center bg-blue-500 ${isEmailConfirmed ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={isEmailConfirmed} // 이메일 발송 이후 변경 불가
                  />
                </article>
                {emailErrors.email && (
                  <span className="text-[red]">이메일을 입력해 주세요.</span>
                )}
              </article>
            </section>
          </form>

          {/* 2. 인증코드 입력 폼 */}
          <form
            className="flex w-full flex-col items-center justify-center"
            onSubmit={authCodeHandleSubmit(onSubmitAuthCode)}
          >
            {/** 이메일 발송 api 로딩 */}
            {!showAuthCodeInput && <Loading isActive={isEmailConfirmed} />}

            {/* 인증코드 입력 input창 생성 */}
            {showAuthCodeInput && (
              <section>
                <article className="flex flex-col whitespace-pre-wrap">
                  <span className="text-[20px]">✅ 인증코드 입력</span>
                </article>
                <article className="mt-[20px]">
                  <article className="flex h-[40px] gap-5">
                    <input
                      className="w-[200px] border p-2"
                      placeholder="인증코드 6자리"
                      {...authCodeRegister("code", { required: true })}
                    />
                    <ColorButton
                      type="submit"
                      text="인증"
                      className="flex h-full w-[50px] items-center justify-center bg-black"
                    />
                  </article>
                  {authCodeErrors.code && (
                    <span className="text-[red]">
                      인증코드 6자리를 입력해 주세요.
                    </span>
                  )}
                </article>
              </section>
            )}
          </form>
        </div>
      ) : (
        // 카카오 소셜 로그인
        <p className="py-10 text-center">로그인 처리 중입니다...</p>
      )}

      {isOpen && (
        <AlertModal
          message={message}
          open={isOpen}
          onClose={closeModal}
          confirmAction={closeModal}
        />
      )}
    </main>
  );
}
