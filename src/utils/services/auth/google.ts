import { ISignInResult } from "@/typescript/auth.interface";
import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import { IUser } from "@/typescript/user.interface";
import apiClient from "@/utils/axios";

interface IAuthGoogleProps {
  code: string;
}

/** 구글 로그인 api 함수 */
export const authGoogle = async (
  props: IAuthGoogleProps
): Promise<ICommonReturn<ISignInResult>> => {
  // props
  const { code } = props;

  try {
    const response: ICommonResponse<ISignInResult> = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/google`,
      {
        code,
      }
    );

    const authGoogleData = response.data.data;

    if (!authGoogleData) {
      throw new Error("로그인에 실패하였습니다.(응답값 없음)");
    }

    // 토큰값을 localStorage에 저장
    localStorage.setItem("token", authGoogleData.token);

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};
