import { ICommonResponse } from "@/typescript/common/response.interface";
import { ILikeData } from "@/typescript/post.interface";
import apiClient from "@/utils/axios";
import { ObjectId } from "mongodb";

interface IExcuteBookmarkProps {
  userId: ObjectId;
  postId: ObjectId;
}

/** 북마크 실행 api 함수 */
export const excuteBookmark = async (props: IExcuteBookmarkProps) => {
  // props
  const { userId, postId } = props;

  const response: ICommonResponse = await apiClient.post("/api/post/bookmark", {
    postId: postId,
    createUser: userId,
  });

  const { result, message } = response.data;

  if (result === "success") {
    alert("북마크 저장/해제를 실행하였습니다.");
  }

  if (result === "failure") {
    alert(message || "북마크 저장/해제를 실패하였습니다.");
  }
};
