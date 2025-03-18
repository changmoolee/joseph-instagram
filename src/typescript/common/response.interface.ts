import { AxiosResponse } from "axios";
import { KeyedMutator } from "swr";

/**
 * 공통 API함수 return 인터페이스
 */
export interface ICommonReturn<T = null> {
  /**
   * 데이터 타입
   */
  data?: T | null;
  /**
   * 성공 또는 실패 결과
   */
  result: "success" | "failure";
  /**
   * 성공 또는 에러 메시지
   */
  message?: string;
}

/**
 * 공통 useSWR 훅 return 인터페이스
 */
export interface IUseSWR<T = null> {
  /**
   * 데이터 타입
   */
  data?: T | null;
  /**
   * 로딩 여부
   */
  isLoading?: boolean;
  /**
   * 성공 또는 에러 메시지
   */
  message?: string;
  /**
   * swr mutate (재호출)
   */
  mutate?: KeyedMutator<ICommonResponse<T>>;
}

/**
 * 백엔드 api return 인터페이스
 */
export interface ICommonResponse<T = null>
  extends AxiosResponse<ICommonReturn<T>> {}
