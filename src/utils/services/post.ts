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

  const response: ICommonResponse = await apiClient.put(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/${post_id}`,
    {
      image_url,
      description,
    }
  );
  return response.data;
};

/** 게시물 삭제 api 함수 */
export const deletePost = async (
  post_id: number
): Promise<ICommonReturn<null>> => {
  const response: ICommonResponse = await apiClient.delete(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post/${post_id}`
  );
  return response.data;
};
