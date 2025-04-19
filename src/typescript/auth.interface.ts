import { IUser } from "@/typescript/user.interface";

export interface ISignInResult extends IUser {
  token: string;
}

export interface IKakaoSignInResult {
  provider_id: string;
  image_url: string;
  username: string;
}
