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
    // /** 북마크 정보 */
    // bookmarkDetails,
    // /** 댓글 정보 */
    // commentDetails,
  } = PostProps;

  /** 게시물 댓글 조회 */
  // const { isLoading, data: commentsData } = useGetPostComments(postId);

  const { trigger } = useSWRMutation(
    `/api/comments/${post_id}`,
    () =>
      apiClient.post<{ result: string; message: string }>(
        `/api/comments/${post_id}`,
        { text: comment }
      ),
    {
      onSuccess: (data) => {
        const { result, message } = data.data;
        alert(message);
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  return (
    <Modal open={open} onClose={onClose}>
      <section className="flex h-[100vh] w-[100vw] max-w-[500px] flex-col overflow-y-auto overscroll-none bg-white pb-[50px] lg:h-[500px] lg:w-[900px] lg:min-w-0 lg:max-w-none lg:flex-row lg:pb-0">
        <div className="relative aspect-square max-h-[300px] w-full bg-black lg:h-full lg:max-h-none lg:w-[60%]">
          <Image
            src={postSrc || "/"}
            alt="post-image"
            className="object-cover"
            fill
          />
        </div>
        <div className="relative h-full w-full pb-[150px] lg:w-[40%]">
          <section className="flex flex-col">
            <ProfileAndName src={user.image_url} name={user.username || ""} />
            <p className="h-[100px] overflow-y-auto overscroll-none px-5 py-2">
              {description}
            </p>
          </section>
          {/* <section className="flex-grow overflow-y-auto overscroll-none p-2 lg:h-[150px]">
            {isLoading ? (
              <>
                <SkeletonComment isActive={isLoading} />
                <SkeletonComment isActive={isLoading} />
              </>
            ) : (
              commentsData?.map((comment) => (
                <Comment
                  key={comment._id.toString()}
                  imageUrl={comment.userImage || "/"}
                  nickName={comment.username || ""}
                  commentContent={comment.text || ""}
                />
              ))
            )}
          </section> */}

          {/* 좋아요 북마크 INPUT */}
          <section className="absolute bottom-0 mt-5 h-[150px] w-full flex-col">
            <div className="flex justify-between px-2 py-1">
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
              {/* <Bookmark
                checked={
                  !!bookmarkDetails.find(
                    (bookmark) => bookmark.userId === userInfo?._id
                  )
                }
                size={20}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?.id) {
                    excuteLike({
                      userId: userInfo?.id || null,
                      postId,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              /> */}
            </div>
            <div className="flex flex-col gap-2 p-2">
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
