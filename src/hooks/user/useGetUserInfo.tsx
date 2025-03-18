import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import { IUserInfo } from "@/typescript/user.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";

/**
 * 회원 데이터 조회 커스텀 훅
 * @param postId
 */
export function useGetUserInfo(userId: string): IUseSWR<IUserInfo> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/user/${userId}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUserInfo>>(urlKey, fetcher);

  const { data, result, message } = userResponse?.data || {};

  if (result === "success") {
    return {
      data,
      isLoading,
      mutate,
    };
  }

  return {
    data: null,
    isLoading,
    message: error?.message || message,
    mutate,
  };
}
