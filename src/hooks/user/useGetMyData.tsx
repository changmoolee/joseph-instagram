import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IUserData } from "@/typescript/user.interface";
import useSWR from "swr";

export function useGetMyData() {
  const urlKey = "/api/user/my-page";
  //
  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IUserData>>(urlKey, fetcher);

  if (userResponse) {
    const { data, result, message } = userResponse.data;

    if (result === "success") {
      return {
        data,
        isLoading,
        message,
      };
    }

    return {
      data,
      error: new Error("나의 프로필 데이터를 불러오지 못했습니다."),
      isLoading,
      message,
    };
  }

  return {
    data: null,
    error: new Error("나의 프로필 데이터를 불러오지 못했습니다."),
    isLoading,
    message: "나의 프로필 데이터를 불러오지 못했습니다.",
  };
}
