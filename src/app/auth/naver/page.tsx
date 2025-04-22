"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useLoginStore } from "@/store/useLoginStore";
import { authNaver } from "@/utils/services/auth/naver";

interface ISearchParams {
  /** 토큰 받기 요청에 필요한 인가 코드 */
  code: string;
  /** 인증 실패 시 반환되는 에러 코드 */
  error: string;
  /** 인증 실패 시 반환되는 에러 메시지 */
  error_description: string;
  /** CSRF 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰값 (로그인 페이지에서 생성 후 GET 요청에 포함 -> 네이버에서 다시 파라미터로 돌려줌) */
  state: string;
}

export interface IEmailFormValues {
  email: string;
}

export default function AuthNaverPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { code, error, error_description, state } = searchParams;

  const router = useRouter();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  React.useEffect(() => {
    if (!code || !state || error) {
      return;
    }

    const handleNaverAuth = async () => {
      try {
        const authNaverResponse = await authNaver({ code, state });

        const { result, data: responseData, message } = authNaverResponse;

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
        }
      } catch (error) {
        console.error("naver 로그인 실패", error);
      }
    };

    handleNaverAuth();
  }, [code, router]);

  // 네이버 인증 실패 시
  if (!code || error || !state) {
    return (
      <span>
        {error_description || "네이버 로그인 중 에러가 발생하였습니다."}
      </span>
    );
  }

  return <p className="py-10 text-center">로그인 처리 중입니다...</p>;
}
