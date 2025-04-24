import { IUser } from "@/typescript/user.interface";

export interface ISignInResult extends IUser {
  token: string;
  isDeleted: boolean; // 탈퇴 후 재로그인 여부 전달 (25.04.24 새로 isDeleted 추가)
}

export interface IKakaoSignInResult {
  provider_id: string;
  image_url: string;
  username: string;
}
