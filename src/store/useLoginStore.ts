import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUserData } from "@/typescript/user.interface";

interface LoginState {
  isLogin: boolean;
  token: string;
  userInfo: IUserData | null;
  excuteLogin: (data: IUserData) => void;
  excuteLogout: () => void;
}

/** 로그인 전역상태 */
export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogin: false,
      token: "",
      userInfo: null,
      excuteLogin: (data) => set({ isLogin: true, userInfo: { ...data } }),
      excuteLogout: () => set({ isLogin: false, userInfo: null }),
    }),
    {
      name: process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY as string, // 로컬 스토리지에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 종류를 지정 (여기서는 localStorage)
    }
  )
);
