import { ObjectId } from "mongodb";

/** 유저 데이터 */
export interface IUserData {
  _id: ObjectId;
  image: string;
  email: string;
  name: string;
}

/** 팔로우 데이터 */
export interface IFollowData {
  _id: ObjectId;
  followerId: ObjectId;
  followingId: ObjectId;
  CreatedAt: string;
}

/** 유저 + 팔로우 데이터 */
export interface IRefinedUserData {
  // 유저 데이터
  _id: ObjectId;
  image: string;
  email: string;
  name: string;
  // 게시물 데이터
  totalPostCount: number;
  // 팔로우 데이터
  followers: number;
  following: number;
}
