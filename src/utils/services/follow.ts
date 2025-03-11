import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IExcuteFollowProps {
  user_id: number;
}

/** 팔로우 실행 api 함수 */
export const excuteFollow = async (props: IExcuteFollowProps) => {
  // props
  const { user_id } = props;

  const response: ICommonResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/follow/user`,
    {
      user_id,
    }
  );

  const { result, message } = response.data;

  if (result === "success") {
    alert("팔로우를 등록/해제하였습니다.");
  }

  if (result === "failure") {
    alert(message || "팔로우 등록/해제를 실패하였습니다.");
  }
};
