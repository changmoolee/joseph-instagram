import { create } from "zustand";

interface IEditVerificationState {
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  reset: () => void;
}
/**
 * 비밀번호 재입력 인증 전역상태
 * - localStorage에서 관리하지 않음.
 */
export const useEditVerificationStore = create<IEditVerificationState>(
  (set) => ({
    isVerified: false,
    setIsVerified: (isVerified) => set({ isVerified }),
    reset: () => set({ isVerified: false }),
  })
);
