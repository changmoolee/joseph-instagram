"use client";

import { authGoogle } from "@/utils/services/auth/google";
import { useRouter } from "next/navigation";
import React from "react";
import { useLoginStore } from "@/store/useLoginStore";

interface ISearchParams {
  state: string;
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}

export default function AuthGooglePage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { code } = searchParams;

  const router = useRouter();

  const excuteLogin = useLoginStore((state) => state.excuteLogin);

  React.useEffect(() => {
    if (!code) return;

    const handleGoogleAuth = async () => {
      const authGoogleResponse = await authGoogle({ code });

      const { result, data: responseData, message } = authGoogleResponse;

      if (result === "success" && responseData) {
        // 로그인 전역상태
        excuteLogin({
          id: responseData.id,
          email: responseData.email,
          image_url: responseData.image_url,
          username: responseData.username,
          provider: responseData.provider,
        });
        // 메인페이지로 이동
        router.push("/");
      }

      if (result === "failure") {
        // 에러메시지
        alert(message);
        // 메인페이지로 이동
        router.push("/");
      }
    };

    handleGoogleAuth();
  }, [code, router, excuteLogin]);

  return <p className="py-10 text-center">로그인 처리 중입니다...</p>;
}
