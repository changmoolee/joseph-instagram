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
import { IUserData } from "@/typescript/user.interface";
import useSWRMutation from "swr/mutation";
import apiClient from "@/utils/axios";
import { useGetPostComments } from "@/hooks/post/useGetPostComments";
import { IoMdClose } from "react-icons/io";
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
  userInfo: IUserData | null;
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
    _id: postId,
    /** 게시글 이미지 */
    image: postSrc,
    /** 게시글 내용 */
    description,
    /** 게시글 생성 날짜 */
    CreateDate: createDate,
    /** 북마크 여부 */
    bookmark,
    /** 회원 정보 */
    userDetails,
    /** 좋아요 정보 */
    likeDetails,
    /** 북마크 정보 */
    bookmarkDetails,
    /** 댓글 정보 */
    commentDetails,
  } = PostProps;

  /** 게시물 댓글 조회 */
  const { isLoading, data: commentsData } = useGetPostComments(postId);

  const { trigger } = useSWRMutation(
    `/api/comments/${postId}`,
    () =>
      apiClient.post<{ result: string; message: string }>(
        `/api/comments/${postId}`,
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
      <section className="max-w-[500px] min-w-[320px] w-full max-h-[100vh] h-fit flex flex-col lg:max-w-none lg:min-w-none lg:w-[800px] lg:h-[500px] lg:flex-row bg-white overflow-y-auto">
        <div className="w-full flex justify-end p-2 lg:hidden">
          <button onClick={onClose}>
            <IoMdClose className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="relative w-full h-[300px] lg:w-[60%] lg:h-full bg-black">
          <Image
            src={postSrc || "/"}
            alt="post-image"
            className="object-cover"
            fill
          />
        </div>
        <div className="relative w-full h-auto lg:w-[40%]">
          <section className="flex flex-col">
            <ProfileAndName
              src={userDetails.at(0)?.image}
              name={userDetails.at(0)?.name || ""}
            />
            <p className="max-h-[200px] px-5 py-2 overflow-y-auto">
              {description}
            </p>
          </section>
          <section className="h-[200px] p-2 overflow-y-auto">
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
          </section>
          <section className="lg:absolute bottom-0 w-full flex-col mt-5">
            <div className="flex justify-between px-2 py-1">
              <Like
                checked={
                  !!likeDetails.find((like) => like.userId === userInfo?._id)
                }
                size={20}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?._id) {
                    excuteLike({
                      userId: userInfo?._id || null,
                      postId,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
              <Bookmark
                checked={
                  !!bookmarkDetails.find(
                    (bookmark) => bookmark.userId === userInfo?._id
                  )
                }
                size={20}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?._id) {
                    excuteLike({
                      userId: userInfo?._id || null,
                      postId,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2 p-2">
              <span>{likeDetails.length} Like</span>
              <span className="text-gray-400">
                {dayjs(createDate).fromNow()}
              </span>
            </div>
            <CommentInput
              onChange={(text) => setComment(text)}
              onButtonClick={() => {
                if (userInfo?._id) {
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
