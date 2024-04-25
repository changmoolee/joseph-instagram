import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IUserData } from "@/typescript/user.interface";
import useSWR from "swr";

export function useGetUser(searchWord: string) {
  const urlKey = "/api/user/search";

  const fetcher = async () =>
    await apiClient.get(urlKey, {
      params: { searchWord },
    });

  const {
    data: userResponse,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUserData[]>>(urlKey, fetcher);

  if (userResponse) {
    const { data, result, message } = userResponse.data;

    if (result === "success") {
      return {
        data,
        isLoading,
        message,
        mutate,
      };
    }

    return {
      data,
      error: new Error("나의 프로필 데이터를 불러오지 못했습니다."),
      isLoading,
      message,
      mutate,
    };
  }
}
