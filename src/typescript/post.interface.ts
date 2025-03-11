import { IUser } from "@/typescript/user.interface";

/** 게시물 데이터 */
export interface IPostData extends IPost {}

/** 마이그레이션 게시물 데이터 */
export interface IPostUnified {
  id: number;
  created_at: string;
  description: string | null;
  image_url: string;
  user: IUser;
  likes: ILike[];
  bookmarks: IBookmark[];
}

/** 마이그레이션 게시물 데이터 */
export interface IPost {
  id: number;
  created_at: string;
  description: string | null;
  image_url: string;
}

/** 좋아요 마이그레이션 데이터 */
export interface ILike {
  id: number;
  created_at: string;
  user: {
    id: number;
  };
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

/** 게시물 댓글 마이그레이션 데이터 */
export interface IPostComment {
  id: number;
  content: string | null;
  created_at: string;
  updated_at: string | null;
  parent_comment_id: number | null;
  user: IUser;
}
