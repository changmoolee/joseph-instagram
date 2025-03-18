import {
  ICommonResponse,
  ICommonReturn,
} from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";

interface IEditPostProps {
  post_id: number;
  image_url: string;
  description: string;
}

/** 게시물 수정 api 함수 */
export const editPost = async (
  props: IEditPostProps
): Promise<ICommonReturn<null>> => {
  // props
  const { post_id, image_url, description } = props;

  try {
    const response: ICommonResponse = await apiClient.put(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/${post_id}`,
      {
        image_url,
        description,
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

/** 게시물 삭제 api 함수 */
export const deletePost = async (
  post_id: number
): Promise<ICommonReturn<null>> => {
  try {
    const response: ICommonResponse = await apiClient.delete(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/${post_id}`
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
