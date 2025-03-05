import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostComment, IPostCommentData } from "@/typescript/post.interface";
import { ObjectId } from "mongodb";

/**
 * 게시물 댓글 GET 커스텀 훅
 * @param post_id
 */
export function useGetPostComments(post_id: number) {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${post_id}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: commentResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IPostComment[]>>(urlKey, fetcher);

  const { data, result, message } = commentResponse?.data || {};

  if (result === "success") {
    return {
      data,
      isLoading,
      message,
    };
  }

  return {
    data: [],
    error: error || result === "failure",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
  };
}
