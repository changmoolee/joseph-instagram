import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPost } from "@/typescript/post.interface";

/**
 * 회원의 게시물 데이터 GET 커스텀 훅
 * @param userId
 * @param clickedTab
 */
export function useGetUserPost(userId: string, clickedTab: string) {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/user/${userId}?type=${clickedTab.toLowerCase()}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: postResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IPost[]>>(urlKey, fetcher);

  const { data, result, message } = postResponse?.data || {};

  if (result === "success" && data) {
    return {
      data,
      isLoading,
      message,
      mutate,
    };
  }

  return {
    data: null,
    error: error || result === "failure",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
    mutate,
  };
}
