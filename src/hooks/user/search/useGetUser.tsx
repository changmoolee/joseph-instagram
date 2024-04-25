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
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUserData[]>>(urlKey, fetcher);

  // api 호출 성공시
  if (userResponse?.data) {
    const { data, message } = userResponse.data;

    return {
      data,
      isLoading,
      message,
      mutate,
    };
  }

  return {
    data: [],
    error,
    isLoading,
    message: error?.message || "나의 프로필 데이터를 불러오지 못했습니다.",
    mutate,
  };
}
