import { IUserData } from "@/typescript/user.interface";
import { ObjectId } from "mongodb";

/** 게시물 데이터 */
export interface IPostUnifiedData {
  _id: ObjectId;
  CreateUser: ObjectId;
  like_user: string[] | null;
  description: string | null;
  image: string | null;
  CreateDate: string | null;
  userDetails: IUserData[];
  likeDetails: ILikeData[];
  commentDetails: ICommentData[];
  bookmarkDetails: IBookmarkData[];
}

/** 게시물 데이터 */
export interface IPostData {
  _id: ObjectId;
  CreateUser: ObjectId;
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
  CreateUser: ObjectId;
  CreateDate: string | null;
  replies: string[] | null;
}

/** 북마크 데이터 */
export interface IBookmarkData {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  CreateDate: string | null;
}

/** 게시물 댓글 데이터 */
export interface IPostCommentData {
  _id: ObjectId;
  text: string | null;
  postId: ObjectId;
  userImage: string | null;
  username: string | null;
  CreateUser: ObjectId;
  CreateDate: string | null;
  replies: string[] | null;
}
