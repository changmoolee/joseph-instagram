/** 마이그레이션 유저 데이터 */
export interface IUser {
  id: number;
  image_url: string;
  email: string;
  username: string;
}

/** 유저 팔로우 데이터 */
export interface IUserFollow {
  follower: IUserInfo[];
  following: IUserInfo[];
}

/** 유저 - 팔로우, 게시물 데이터 */
export interface IUserInfo extends IUser {
  posts: { id: number }[];
  follower: { id: number }[];
  following: { id: number }[];
}

/** 검색 - 회원, 팔로우 데이터 */
export interface ISearchUserInfo extends IUserFollow, IUser {}
