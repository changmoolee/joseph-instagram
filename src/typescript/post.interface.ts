import { IUserData } from "@/typescript/user.interface";
import { ObjectId } from "mongodb";

/** 게시물 데이터 */
export interface IPostUnifiedData {
  _id: ObjectId;
  CreateUser: string | null;
  like_user: string[] | null;
  description: string | null;
  image: string | null;
  CreateDate: string | null;
  userDetails: IUserData[];
  likeDetails: ILikeData[];
  commentDetails: ICommentData[];
}

/** 게시물 데이터 */
export interface IPostData {
  _id: ObjectId;
  CreateUser: string | null;
  like_user: string[] | null;
  description: string | null;
  image: string | null;
  CreateDate: string | null;
}

/** 좋아요 데이터 */
export interface ILikeData {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  CreateDate: string | null;
}

/** 댓글 데이터 */
export interface ICommentData {
  _id: ObjectId;
  text: string | null;
  postId: ObjectId;
  CreateUser: string | null;
  CreateDate: string | null;
  replies: string[] | null;
}
