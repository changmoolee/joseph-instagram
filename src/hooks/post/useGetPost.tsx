import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";
import { IPostUnified } from "@/typescript/post.interface";

export function useGetPost(id: number): IUseSWR<IPostUnified> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/${id}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: postResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IPostUnified>>(urlKey, fetcher);

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
