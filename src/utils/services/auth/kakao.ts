import { IKakaoSignInResult, ISignInResult } from "@/typescript/auth.interface";
import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import { IUser } from "@/typescript/user.interface";
import apiClient from "@/utils/axios";

interface IAuthKakaoProps {
  code: string;
}

/** 카카오 로그인 api 함수 */
export const authKakao = async (
  props: IAuthKakaoProps
): Promise<ICommonReturn<ISignInResult | IKakaoSignInResult>> => {
  // props
  const { code } = props;

  try {
    const response: ICommonResponse<ISignInResult | IKakaoSignInResult> =
      await apiClient.post(
        `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/kakao`,
        {
          code,
        }
      );

    const authKakaoData = response.data.data;

    if (!authKakaoData) {
      throw new Error("로그인에 실패하였습니다.(응답값 없음)");
    }

    if ("token" in authKakaoData) {
      // 토큰값을 localStorage에 저장
      localStorage.setItem("token", authKakaoData.token);
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

interface IAuthKakaoSignupProps {
  email: string;
  username: string;
  image_url: string;
  provider_id: string;
}

/** 카카오 소셜 회원가입 api 함수 */
export const authKakaoSignup = async (
  props: IAuthKakaoSignupProps
): Promise<ICommonReturn<IUser>> => {
  // props
  const { email, username, image_url, provider_id } = props;

  try {
    const response = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/kakao/signup`,
      {
        email,
        username,
        image_url,
        provider_id,
      }
    );

    const authKakaoData = response.data.data;

    if (!authKakaoData) {
      throw new Error("로그인에 실패하였습니다.(응답값 없음)");
    }

    // 토큰값을 localStorage에 저장
    localStorage.setItem("token", authKakaoData.token);

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};
