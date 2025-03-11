import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IExcuteLikeProps {
  user_id: number;
  post_id: number;
}

/** 좋아요 실행 api 함수 */
export const excuteLike = async (
  props: IExcuteLikeProps
): Promise<ICommonReturn<null>> => {
  // props
  const { user_id, post_id } = props;

  const response: ICommonResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/like/post`,
    {
      post_id,
      user_id,
    }
  );
  return response.data;
};
