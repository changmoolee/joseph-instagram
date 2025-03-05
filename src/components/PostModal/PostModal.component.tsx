"use client";

import React from "react";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Comment from "@/components/Comment/Comment.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Modal from "@/components/Modal/Modal.component";
import { IPostProps } from "@/components/Post/Post.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { excuteLike } from "@/utils/services/like";
import { IUser } from "@/typescript/user.interface";
import useSWRMutation from "swr/mutation";
import apiClient from "@/utils/axios";
import { useGetPostComments } from "@/hooks/post/useGetPostComments";
import SkeletonComment from "@/components/Comment/SkeletonComment.component";
import { makeComment } from "@/utils/services/comment";
import { mutate } from "swr";

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
   * Post 컴포넌트의 props
   */
  PostProps: IPostProps;
  /**
   * 로그인한 회원의 프로필 데이터
   */
  userInfo: IUser | null;
}

/**
 * 포스트 모달
 * @description 게시물 클릭시 구현되는 모달
 */
export default function PostModal(props: IPostModalProps) {
  // props
  const { open, onClose, PostProps, userInfo } = props;

  // 입력된 댓글 텍스트
  const [comment, setComment] = React.useState<string>("");

  // props
  const {
    /** 게시글 Idx */
    id: post_id,
    /** 게시글 생성 날짜 */
    created_at: createDate,
    /** 게시글 이미지 */
    image_url: postSrc,
    /** 게시글 내용 */
    description,
    /** 북마크 여부 */
    // bookmark,
    /** 회원 정보 */
    user,
    /** 좋아요 정보 */
    likes,
    /** 북마크 정보 */
    bookmarks,
    // /** 댓글 정보 */
    // commentDetails,
  } = PostProps;

  const getPostsUrlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post`;

  /** 게시물 댓글 조회 */
  const { isLoading, data: commentsData } = useGetPostComments(post_id);

  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post`,
    () => {
      if (!userInfo?.id) {
        return;
      }

      return makeComment({
        post_id,
        user_id: userInfo?.id,
        content: comment,
      });
    },
    {
      onSuccess: (data) => {
        if (data?.message) {
          alert(data.message);
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  const excuteLikeApi = async (userInfo: IUser) => {
    const { result } = await excuteLike({
      user_id: userInfo.id,
      post_id,
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
      <section className="flex h-full w-full min-w-[320px] max-w-[500px] flex-col overflow-y-auto overscroll-none bg-white lg:h-[500px] lg:w-[900px] lg:min-w-0 lg:max-w-none lg:flex-row lg:pb-0">
        <div className="relative aspect-square max-h-[300px] w-full bg-black lg:h-full lg:max-h-none lg:w-[60%]">
          <Image
            src={postSrc || "/"}
            alt="post-image"
            className="object-cover"
            fill
          />
        </div>
        <div className="relative h-full w-full lg:w-[40%]">
          <section className="flex flex-col">
            <ProfileAndName src={user.image_url} name={user.username || ""} />
            <p className="h-[100px] overflow-y-auto overscroll-none px-[10px] py-[4px]">
              {description}
            </p>
          </section>
          <section className="hidden flex-grow overflow-y-auto overscroll-none px-[10px] py-[4px] lg:block lg:h-[150px]">
            {isLoading ? (
              <>
                <SkeletonComment isActive={isLoading} />
                <SkeletonComment isActive={isLoading} />
              </>
            ) : (
              commentsData?.map((comment) => (
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
              <button className="text-[14px] text-gray-400 underline">
                댓글보기
              </button>
            </div>

            <div className="flex justify-between px-[10px] py-[4px]">
              <Like
                checked={!!likes.find((like) => like.user.id === userInfo?.id)}
                size={20}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?.id) {
                    excuteLike({
                      user_id: userInfo.id,
                      post_id,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
              <Bookmark
                checked={
                  !!bookmarks.find(
                    (bookmark) => bookmark.user.id === userInfo?.id
                  )
                }
                size={20}
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
              {/* <span>{likeDetails.length} Like</span> */}
              <span className="text-gray-400">
                {dayjs(createDate).fromNow()}
              </span>
            </div>
            <CommentInput
              onChange={(text) => setComment(text)}
              onButtonClick={() => {
                if (userInfo?.id) {
                  trigger();
                  console.log("등록", comment);
                } else {
                  alert("로그인이 필요합니다.");
                }
              }}
            />
          </section>
        </div>
      </section>
    </Modal>
  );
}
