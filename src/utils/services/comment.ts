import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IMakeCommentProps {
  post_id: number;
  content: string;
  parent_comment_id?: number;
}

/** 댓글 생성 api 함수 */
export const makeComment = async (
  props: IMakeCommentProps
): Promise<ICommonReturn<null>> => {
  // props
  const { post_id, content, parent_comment_id } = props;

  try {
    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${post_id}`,
      {
        content,
        ...(parent_comment_id && { parent_comment_id }),
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

/** 댓글 삭제 api 함수 */
export const deleteComment = async (
  id: number
): Promise<ICommonReturn<null>> => {
  try {
    const response = await apiClient.delete(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${id}`
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
