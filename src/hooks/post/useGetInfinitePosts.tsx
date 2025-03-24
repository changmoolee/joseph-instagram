import {
  ICommonResponse,
  IUseSWR,
  IUseSWRInfinite,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IPostUnified } from "@/typescript/post.interface";
import useSWRInfinite from "swr/infinite";

export function useGetInfinitePosts(): IUseSWRInfinite<IPostUnified[]> {
  /** 다음 페이지를 요청할 때 호출하는 함수 */
  const getKey = (
    /** 0부터 시작 */
    pageIndex: number,
    /** 이전 페이지 데이터 */
    previousPageData: IPostUnified[] | null
  ) => {
    if (previousPageData && previousPageData.length === 0) {
      return null; // 이전 페이지 데이터값이 빈배열, 즉 더이상 게시물이 없는 마지막 페이지면 요청 중단
    }

    // 첫 요청 - 첫 페이지일 경우
    if (pageIndex === 0) {
      return `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post?take=5`;
    }

    // 마지막 포스트의 created_at 값을 커서로 넘김
    const lastPost =
      previousPageData && previousPageData[previousPageData.length - 1];

    const cursor = lastPost?.created_at;

    return `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post?cursor=${cursor}&take=5`; // SWR 키
  };

  const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    /** 응답값이 <AxiosResponse<IPostUnified[]>가 아닌, -> IPostUnified[]로 수정 25.03.24 */
    return response.data;
  };

  const {
    data: infiniteResponse,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite<IPostUnified[]>(getKey, fetcher);

  const posts = infiniteResponse?.flat() || [];

  const isReachingEnd =
    infiniteResponse &&
    infiniteResponse[infiniteResponse.length - 1]?.length === 0;

  return {
    data: posts,
    isLoading,
    size,
    setSize,
    isReachingEnd,
  };
}
