"use client";

import React from "react";
import Modal from "@/components/Modal/Modal.component";
import { useRouter } from "next/navigation";

interface IAlertModalProps {
  /**
   * AlertModal 구현 여부
   */
  open: boolean;
  /**
   * AlertModal 닫는 함수
   */
  onClose: () => void;
  /**
   * 메시지 내용
   */
  message: string;
  /**
   * 취소 버튼 사용 유무
   */
  showCancelButton: boolean;
}

/**
 * Alert 모달
 * @description 각종 알림 모달
 */
export default function AlertModal(props: IAlertModalProps) {
  // props
  const { open, onClose, message, showCancelButton } = props;

  const router = useRouter();

  const redirectToLogin = () => router.push("/login");

  return (
    <Modal open={open} onClose={onClose}>
      <section className="flex h-screen w-screen items-center justify-center">
        <div className="flex max-h-[200px] min-h-[150px] w-[90%] max-w-[300px] flex-col justify-between rounded-lg bg-white p-[20px] pt-[30px]">
          {/* 메시지 */}
          <span className="text-lg font-bold">{message}</span>

          {/* 버튼 */}
          <article className="flex gap-2">
            {showCancelButton && (
              <button
                className="flex-1 rounded-md bg-gray-200 p-[5px] text-black"
                onClick={onClose}
              >
                취소
              </button>
            )}
            <button
              className="flex-1 rounded-md bg-blue-500 p-[5px] text-white"
              onClick={redirectToLogin}
            >
              확인
            </button>
          </article>
        </div>
      </section>
    </Modal>
  );
}
