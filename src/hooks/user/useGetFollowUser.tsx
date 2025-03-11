import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IUserFollow } from "@/typescript/user.interface";

/**
 * 회원 팔로우/팔로워 데이터 조회 커스텀 훅
 * @param postId
 */
export function useGetFollowUser(user_id: number) {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/follow/user/${user_id}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IUserFollow>>(urlKey, fetcher);

  const { data, result, message } = userResponse?.data || {};

  if (result === "success") {
    return {
      data,
      isLoading,
      message,
    };
  }

  return {
    data,
    error: error || result === "failure",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
  };
}
