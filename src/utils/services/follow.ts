import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IExcuteFollowProps {
  user_id: number;
}

/** 팔로우 실행 api 함수 */
export const excuteFollow = async (
  props: IExcuteFollowProps
): Promise<ICommonReturn<null>> => {
  // props
  const { user_id } = props;

  try {
    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/follow/user`,
      {
        user_id,
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
