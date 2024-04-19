import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostData } from "@/typescript/post.interface";

export function useGetPost() {
  const urlKey = "/api/post";
  //
  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: postResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse<IPostData[]>>(urlKey, fetcher);

  if (postResponse) {
    const { data, result, message } = postResponse.data;

    return {
      data: data || [],
      isLoading,
      message,
    };
  }

  return {
    data: [],
    error,
    isLoading,
  };
}
