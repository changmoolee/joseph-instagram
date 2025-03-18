import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { ISearchUserInfo } from "@/typescript/user.interface";
import useSWR from "swr";

export function useSearchUser(searchWord: string): IUseSWR<ISearchUserInfo[]> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/user/search?text=${searchWord}`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<ISearchUserInfo[]>>(urlKey, fetcher);

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
