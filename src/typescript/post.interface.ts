import { IUser, IUserData } from "@/typescript/user.interface";
import { ObjectId } from "mongodb";

/** 게시물 데이터 */
export interface IPostUnifiedData extends IPost {
  like_user: string[] | null;
  user: IUser;
  likeDetails: ILikeData[];
  commentDetails: ICommentData[];
  bookmarkDetails: IBookmarkData[];
}

/** 게시물 데이터 */
export interface IPostData extends IPost {}

/** 마이그레이션 게시물 데이터 */
export interface IPostUnified {
  id: number;
  user_id: number;
  created_at: string;
  description: string | null;
  image_url: string;
  user: IUser;
  likes: ILike[];
  bookmarks: IBookmark[];
  // commentDetails: ICommentData[];
}

/** 마이그레이션 게시물 데이터 */
export interface IPost {
  id: number;
  user_id: number;
  created_at: string;
  description: string | null;
  image_url: string;
}

/** 좋아요 데이터 */
export interface ILikeData {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  CreateDate: string | null;
}

/** 좋아요 마이그레이션 데이터 */
export interface ILike {
  id: number;
  created_at: string;
  user: {
    id: number;
  };
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

/** 북마크 데이터 */
export interface IBookmark {
  id: number;
  created_at: string;
  user: {
    id: number;
  };
  post_id: number;
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

/** 게시물 댓글 마이그레이션 데이터 */
export interface IPostComment {
  id: number;
  content: string | null;
  created_at: string;
  updated_at: string | null;
  parent_comment_id: number | null;
  user: IUser;
}
