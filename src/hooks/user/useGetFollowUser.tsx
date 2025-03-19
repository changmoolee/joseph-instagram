import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IUserFollow } from "@/typescript/user.interface";

/**
 * 회원 팔로우/팔로워 데이터 조회 커스텀 훅
 * @param postId
 */
export function useGetFollowUser(user_id: number): IUseSWR<IUserFollow> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/follow/user/${user_id}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUserFollow>>(urlKey, fetcher);

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
