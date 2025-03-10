import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IUser } from "@/typescript/user.interface";
import useSWR from "swr";

export function useGetUser(searchWord: string) {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/user/search?text=${searchWord}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUser[]>>(urlKey, fetcher);

  const { data, result, message } = userResponse?.data || {};

  if (result === "success") {
    return {
      data,
      isLoading,
      message,
      mutate,
    };
  }

  return {
    data: [],
    error: error || result === "failure",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
    mutate,
  };
}
