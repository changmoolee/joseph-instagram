import { ObjectId } from "mongodb";

/** 유저 데이터 */
export interface IUserData {
  _id: ObjectId;
  image: string;
  email: string;
  name: string;
}
