import { ISignInResult } from "@/typescript/auth.interface";
import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IAuthNaverProps {
  code: string;
  state: string;
}

/** 네이버 로그인 api 함수 */
export const authNaver = async (
  props: IAuthNaverProps
): Promise<ICommonReturn<ISignInResult>> => {
  // props
  const { code, state } = props;

  try {
    const response: ICommonResponse<ISignInResult> = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/naver`,
      {
        code,
        state,
      }
    );

    const authNaverData = response.data.data;

    if (!authNaverData) {
      throw new Error("로그인에 실패하였습니다.(응답값 없음)");
    }

    const { token, isDeleted } = authNaverData;

    // 토큰값을 localStorage에 저장
    localStorage.setItem("token", token);

    // 탈퇴 회원이 재로그인한 경우
    if (isDeleted) {
      // 백엔드 메시지 사용
      alert(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};
