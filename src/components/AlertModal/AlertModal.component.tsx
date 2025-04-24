"use client";

import React from "react";
import Modal from "@/components/Modal/Modal.component";

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
  showCancelButton?: boolean;
  /**
   * 확인 버튼 사용시 실행될 함수
   */
  confirmAction: () => void;
}

/**
 * Alert 모달
 * @description 각종 알림 모달
 */
export default function AlertModal(props: IAlertModalProps) {
  // props
  const {
    open,
    onClose,
    message,
    showCancelButton = false,
    confirmAction,
  } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <section className="flex h-screen w-screen items-center justify-center">
        <div className="flex max-h-[350px] min-h-[200px] w-[80%] min-w-[200px] max-w-[350px] flex-col justify-between rounded-lg bg-white p-[20px] pt-[30px]">
          {/* 메시지 */}
          <span className="whitespace-pre-wrap text-lg font-bold">
            {message}
          </span>

          {/* 버튼 */}
          <article className="mt-[20px] flex gap-2">
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
              onClick={confirmAction}
            >
              확인
            </button>
          </article>
        </div>
      </section>
    </Modal>
  );
}
