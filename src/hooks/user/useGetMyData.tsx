import {
  ICommonResponse,
  IUseSWR,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IUser } from "@/typescript/user.interface";
import useSWR from "swr";

export function useGetMyData(): IUseSWR<IUser> {
  const urlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/user/my-page`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: userResponse,
    error,
    isLoading,
    mutate,
  } = useSWR<ICommonResponse<IUser>>(urlKey, fetcher);

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
