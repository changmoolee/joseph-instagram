import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import useSWR from "swr";

/**
 * 회원 로그인 여부 체크
 */
export function useCheckLogin() {
  const urlKey = `/api/auth/check`;

  const fetcher = async () => await apiClient.get(urlKey);

  const {
    data: checkResponse,
    error,
    isLoading,
  } = useSWR<ICommonResponse>(urlKey, fetcher);

  const { data, result, message } = checkResponse?.data || {};

  if (result === "success") {
    return {
      data: {
        isLogin: true,
      },
      isLoading,
      message,
    };
  }

  return {
    data: { isLogin: false },
    error: error || result === "failure",
    isLoading,
    message: error
      ? "네트워크 연결 상태 등의 원인으로 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      : message,
  };
}
