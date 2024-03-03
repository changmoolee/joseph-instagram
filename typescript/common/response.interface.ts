import { AxiosResponse } from "axios";

/**
 * 공통 return 인터페이스
 */
export interface ICommonReturn<T = null> {
  /**
   * 데이터 타입
   */
  data?: T | null;
  /**
   * 성공 또는 실패 결과
   */
  result: "success" | "fail";
  /**
   * 성공 또는 에러 메시지
   */
  message?: string;
}

/**
 * 백엔드 api return 인터페이스
 */
export interface ICommonResponse<T = null>
  extends AxiosResponse<ICommonReturn<T>> {}
