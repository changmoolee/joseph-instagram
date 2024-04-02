import apiClient from "@/utils/axios";
import { ICommonResponse } from "../../typescript/common/response.interface";
import { IUserData } from "../../typescript/user.interface";

/**
 * 유저 개인 데이터 호출
 */
export const getUserData = async () => {
  // 객체분해할당

  const response: ICommonResponse<IUserData> = await apiClient.get(
    `/api/user/my-page`,
    {
      withCredentials: true,
    }
  );

  const { result, data, message } = response.data;

  if (result === "success" && data) {
    return { result: "success", data, message };
  } else {
    // 에러메시지
    alert(message);
    return { result: "fail", data: null, message };
  }
};
