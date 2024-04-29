import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostData } from "@/typescript/post.interface";

export function useGetMyPost(userId: string, clickedTab: string) {
  const urlKey = `/api/post/${userId}`;

  const fetcher = async () =>
    await apiClient.get(urlKey, {
      params: { post: clickedTab.toLocaleLowerCase() },
    });

  const {
    data: postResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IPostData[]>>(urlKey, fetcher);

  const { data, result, message } = postResponse?.data || {};

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
