import { ISignInFormValues } from "@/app/login/page";
import { ISignUpFormValues } from "@/app/sign-up/page";
import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import { IUser } from "@/typescript/user.interface";
import apiClient from "@/utils/axios";

/**
 * 회원가입 함수
 */
export const signUp = async (
  props: ISignUpFormValues
): Promise<ICommonReturn<null>> => {
  const { email, username, password, image_url } = props;

  try {
    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signup`,
      {
        ...(image_url && { image_url }),
        email,
        username,
        password,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};

interface ISignInResult extends IUser {
  token: string;
}

/**
 * 로그인 함수
 */
export const signIn = async (
  props: ISignInFormValues
): Promise<ICommonReturn<IUser>> => {
  try {
    // 객체분해할당
    const { email, password } = props;

    const response: ICommonResponse<ISignInResult> = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signin`,
      {
        email,
        password,
      }
    );

    const signInData = response.data.data;

    if (!signInData) {
      throw new Error("로그인에 실패하였습니다.(응답값 없음)");
    }

    // 토큰값을 localStorage에 저장
    localStorage.setItem("token", signInData.token);

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};

/**
 * 로그아웃 함수
 */
export const signOut = async (): Promise<ICommonReturn<null>> => {
  try {
    /** 현재 쿠키 로그인 방식을 사용하지 않으므로 주석 처리 */
    // const response: ICommonResponse = await apiClient.post(
    //   `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signout`
    // );

    // return response.data;
    // 토큰값을 localStorage에서 제거

    localStorage.removeItem("token");

    return {
      data: null,
      result: "success",
      message: "로그아웃 되었습니다.",
    };
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};
