/** 게시물 데이터 */
export interface IPostData {
  _id: string | null;
  CreateUser: string | null;
  like_user: string[] | null;
  description: string | null;
  image: string | null;
  CreateDate: string | null;
}
