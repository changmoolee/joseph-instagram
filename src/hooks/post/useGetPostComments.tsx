import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostComment } from "@/typescript/post.interface";

/**
 * 게시물 댓글 GET 커스텀 훅
 * @param post_id
 */
export function useGetPostComments(post_id: number): IUseSWR<IPostComment[]> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${post_id}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: commentResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IPostComment[]>>(urlKey, fetcher);

  const { data, result, message } = commentResponse?.data || {};

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
