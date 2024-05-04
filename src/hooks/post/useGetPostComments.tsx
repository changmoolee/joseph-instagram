import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostCommentData } from "@/typescript/post.interface";
import { ObjectId } from "mongodb";

/**
 * 게시물 댓글 GET 커스텀 훅
 * @param postId
 */
export function useGetPostComments(postId: ObjectId) {
  const urlKey = `/api/post/${postId}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: commentResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IPostCommentData[]>>(urlKey, fetcher);

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
    error: error || result === "fail",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
  };
}
