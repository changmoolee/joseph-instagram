import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { ObjectId } from "mongodb";

interface IExcuteFollowProps {
  followerId: ObjectId;
}

/** 팔로우 실행 api 함수 */
export const excuteFollow = async (props: IExcuteFollowProps) => {
  // props
  const { followerId } = props;

  const response: ICommonResponse = await apiClient.post("/api/user/follow", {
    followerId,
  });

  const { result, message } = response.data;

  if (result === "success") {
    alert("팔로우를 등록/해제하였습니다.");
  }

  if (result === "fail") {
    alert(message || "팔로우 등록/해제를 실패하였습니다.");
  }
};
