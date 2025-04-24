import apiClient from "@/utils/axios";

interface ISendAuthCodeToEmail {
  email: string;
}

/**
 * 인증코드 발신 api
 * @description
 * - 특정 이메일주소에 6자리 인증코드가 담긴 이메일을 발신한다.
 * - 앱에서만 api 요청 가능할 수 있도록, Nextjs api routes를 거친다.
 */
export const sendAuthCode = async (props: ISendAuthCodeToEmail) => {
  try {
    const { email } = props;

    const response = await apiClient.post(`/api/auth-code/send`, {
      email,
    });

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};

interface IVerifyAuthCode {
  email: string;
  code: string;
}

/**
 * 인증코드 확인 api
 * @description
 * - 회원이 입력한 6자리 인증코드를 백엔드 서버에서 확인한다.
 */
export const verifyAuthCode = async (props: IVerifyAuthCode) => {
  try {
    const { email, code } = props;

    const response = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth-code/verify`,
      {
        email,
        code,
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    };
  }
};
