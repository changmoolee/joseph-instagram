import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IExcuteBookmarkProps {
  user_id: number;
  post_id: number;
}

/** 북마크 실행 api 함수 */
export const excuteBookmark = async (
  props: IExcuteBookmarkProps
): Promise<ICommonReturn<null>> => {
  // props
  const { user_id, post_id } = props;

  const response: ICommonResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/bookmark/post`,
    {
      post_id,
      user_id,
    }
  );

  return response.data;
};
