import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPost } from "@/typescript/post.interface";

/**
 * 회원의 게시물 데이터 GET 커스텀 훅
 * @param userId
 * @param clickedTab
 */
export function useGetUserPost(
  userId: string,
  clickedTab: string
): IUseSWR<IPost[]> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/user/${userId}?type=${clickedTab.toLowerCase()}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: postResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IPost[]>>(urlKey, fetcher);

  const { data, result, message } = postResponse?.data || {};

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
