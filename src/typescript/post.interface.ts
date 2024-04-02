import { IUserData } from "@/typescript/user.interface";

/** 게시물 데이터 */
export interface IPostData {
  _id: string | null;
  CreateUser: string | null;
  like_user: string[] | null;
  description: string | null;
  image: string | null;
  CreateDate: string | null;
  userDetails: IUserData[];
  likeDetails: ILikeData[];
}
/** 좋아요 데이터 */
export interface ILikeData {
  _id: string | null;
  userId: string | null;
  postId: string | null;
  CreateDate: string | null;
}
