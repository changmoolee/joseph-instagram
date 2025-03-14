"use client";

import React from "react";
import Comment from "@/components/Comment/Comment.component";
import Modal from "@/components/Modal/Modal.component";
import { IPostComment } from "@/typescript/post.interface";

interface IPostModalProps {
  /**
   * PostModal 구현 여부
   */
  open: boolean;
  /**
   * PostModal 닫는 함수
   */
  onClose: () => void;
  /**
   * 댓글 데이터
   */
  comments: IPostComment[];
  /**
   * 로그인한 회원 id
   */
  user_id?: number;
  /**
   * 게시판 id
   */
  post_id: number;
}

/**
 * 포스트 모달
 * @description 게시물 클릭시 구현되는 모달
 */
export default function CommentModal(props: IPostModalProps) {
  // props
  const { open, onClose, comments, user_id, post_id } = props;

  return (
    <Modal classname="lg:hidden" open={open} onClose={onClose}>
      <div className="fixed bottom-0 left-0 flex h-[80vh] w-screen flex-col rounded-lg bg-white px-[10px] py-[20px]">
        <span className="flex p-[10px]">댓글</span>
        <section className="overflow-y-auto overscroll-none">
          {comments?.map((comment) => (
            <Comment
              key={comment.id.toString()}
              isDeletable={comment.user.id === user_id}
              post_id={post_id}
              comment={comment}
            />
          ))}
        </section>
      </div>
    </Modal>
  );
}
