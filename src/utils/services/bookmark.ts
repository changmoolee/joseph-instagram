import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IExcuteBookmarkProps {
  post_id: number;
}

/** 북마크 실행 api 함수 */
export const excuteBookmark = async (
  props: IExcuteBookmarkProps
): Promise<ICommonReturn<null>> => {
  // props
  const { post_id } = props;

  try {
    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/bookmark/post`,
      {
        post_id,
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      data: null,
      result: "failure",
      message: error.message,
    };
  }
};
