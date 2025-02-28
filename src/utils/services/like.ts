import { ICommonResponse } from "@/typescript/common/response.interface";
import { ILikeData } from "@/typescript/post.interface";
import apiClient from "@/utils/axios";
import { ObjectId } from "mongodb";

interface IExcuteLikeProps {
  user_id: number;
  post_id: number;
}

/** 좋아요 실행 api 함수 */
export const excuteLike = async (props: IExcuteLikeProps) => {
  // props
  const { user_id, post_id } = props;

  const response: ICommonResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/like/post`,
    {
      post_id,
      user_id,
    }
  );

  const { result, message } = response.data;

  if (result === "success") {
    alert("좋아요를 실행하였습니다.");
  }

  if (result === "failure") {
    alert(message || "좋아요을 실패하였습니다.");
  }
};
