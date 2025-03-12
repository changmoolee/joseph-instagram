"use client";

import React from "react";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Comment from "@/components/Comment/Comment.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Modal from "@/components/Modal/Modal.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { excuteLike } from "@/utils/services/like";
import { IUser } from "@/typescript/user.interface";
import { useGetPostComments } from "@/hooks/post/useGetPostComments";
import SkeletonComment from "@/components/Comment/SkeletonComment.component";
import { makeComment } from "@/utils/services/comment";
import { mutate } from "swr";
import { useModal } from "@/hooks/components/useModal";
import CommentModal from "@/components/CommentModal/CommentModal.component";
import { useGetPost } from "@/hooks/post/useGetPost";

// dayjs의 RelativeTime 플러그인 추가
dayjs.extend(relativeTime);

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
   * 로그인한 회원의 프로필 데이터
   */
  userInfo: IUser | null;
  /**
   * 게시물 id
   */
  id: number;
}

/**
 * 포스트 모달
 * @description 게시물 클릭시 구현되는 모달
 */
export default function PostModal(props: IPostModalProps) {
  // props
  const { open, onClose, userInfo, id } = props;

  // 입력된 댓글 텍스트
  const [comment, setComment] = React.useState<string>("");

  const { data: post } = useGetPost(id);

  const getPostsUrlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post`;

  const getCommentsUrlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${id}`;

  // modal 커스텀 훅
  const { isOpen, openModal, closeModal } = useModal();

  /** 게시물 댓글 조회 */
  const { isLoading, data: comments } = useGetPostComments(id);

  const makeCommentApi = async () => {
    if (!userInfo) {
      alert("로그인한 회원의 정보가 없습니다.");
      return;
    }

    const { result } = await makeComment({
      post_id: id,
      user_id: userInfo?.id,
      content: comment,
    });

    if (result === "success") {
      mutate(getCommentsUrlKey);
    }
    if (result === "failure") {
      alert("댓글 생성을 실패하였습니다.");
    }
  };

  const excuteLikeApi = async (userInfo: IUser) => {
    const { result } = await excuteLike({
      post_id: id,
      user_id: userInfo.id,
    });

    if (result === "success") {
      mutate(getPostsUrlKey);
    }
    if (result === "failure") {
      alert("좋아요 실행을 실패하였습니다.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <section className="flex h-[calc(100vh-40px)] w-screen min-w-[320px] max-w-[500px] flex-col overflow-y-auto overscroll-none bg-white lg:h-[500px] lg:w-[900px] lg:min-w-0 lg:max-w-none lg:flex-row lg:pb-0">
        <div className="relative aspect-square max-h-[300px] w-full bg-black lg:h-full lg:max-h-none lg:w-[60%]">
          <Image
            src={post?.image_url || "/"}
            alt="post-image"
            className="object-cover"
            fill
          />
        </div>
        <div className="relative h-full w-full lg:w-[40%]">
          <section className="flex flex-col">
            <ProfileAndName
              src={post?.user.image_url}
              name={post?.user.username || ""}
            />
            <p className="h-[100px] overflow-y-auto overscroll-none px-[10px] py-[4px]">
              {post?.description}
            </p>
          </section>
          <section className="hidden flex-grow overflow-y-auto overscroll-none px-[10px] py-[4px] lg:block lg:h-[150px]">
            {isLoading ? (
              <>
                <SkeletonComment isActive={isLoading} />
                <SkeletonComment isActive={isLoading} />
              </>
            ) : (
              comments?.map((comment) => (
                <Comment
                  key={comment.id.toString()}
                  imageUrl={comment.user.image_url || "/"}
                  nickName={comment.user.username || ""}
                  commentContent={comment.content || ""}
                />
              ))
            )}
          </section>

          {/* 좋아요 북마크 INPUT */}
          <section className="absolute bottom-[0px] w-full flex-col pb-[20px] lg:pb-0">
            <div className="flex justify-end p-[10px] lg:hidden">
              <button
                className="text-[14px] text-gray-400 underline"
                onClick={openModal}
              >
                댓글보기
              </button>
            </div>

            <div className="flex justify-between px-[10px] py-[4px]">
              <Like
                checked={
                  !!post?.likes.find((like) => like.user.id === userInfo?.id)
                }
                size={25}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?.id) {
                    excuteLike({
                      post_id: id,
                      user_id: userInfo.id,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
              <Bookmark
                checked={
                  !!post?.bookmarks.find(
                    (bookmark) => bookmark.user.id === userInfo?.id
                  )
                }
                size={25}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?.id) {
                    excuteLikeApi(userInfo);
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2 p-[10px]">
              <span>{post?.likes.length} Like</span>
              <span className="text-gray-400">
                {dayjs(post?.created_at).fromNow()}
              </span>
            </div>
            <CommentInput
              onChange={(text) => setComment(text)}
              onButtonClick={() => {
                if (userInfo?.id) {
                  makeCommentApi();
                } else {
                  alert("로그인이 필요합니다.");
                }
              }}
            />
          </section>
        </div>
      </section>

      {/* 모바일뷰에서 생성되는 댓글모달 */}
      {isOpen && (
        <CommentModal
          open={isOpen}
          onClose={closeModal}
          comments={comments || []}
        />
      )}
    </Modal>
  );
}
