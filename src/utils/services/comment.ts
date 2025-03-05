import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IMakeCommentProps {
  user_id: number;
  post_id: number;
  content: string;
  parent_comment_id?: number;
}

/** 댓글 생성 api 함수 */
export const makeComment = async (
  props: IMakeCommentProps
): Promise<ICommonReturn<null>> => {
  // props
  const { user_id, post_id, content, parent_comment_id } = props;

  const response: ICommonResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post`,
    {
      post_id,
      user_id,
      content,
      ...(parent_comment_id && { parent_comment_id }),
    }
  );
  return response.data;
};
