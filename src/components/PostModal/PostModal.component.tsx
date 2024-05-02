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
    /** 댓글 정보 */
    commentDetails,
  } = PostProps;

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
      <section className="w-[800px] h-[500px] flex bg-white">
        <div className="relative w-[60%] h-full bg-black">
          <Image
            src={postSrc || "/"}
            alt="post-image"
            className="object-cover"
            fill
          />
        </div>
        <div className="relative w-[40%] h-full">
          <section className="flex flex-col">
            <ProfileAndName
              src={userDetails.at(0)?.image}
              name={userDetails.at(0)?.name || ""}
            />
            <p className="px-5 py-2">{description}</p>
          </section>
          <section className="h-[260px] p-2 overflow-y-auto">
            <Comment />
          </section>
          <section className="absolute bottom-0 w-full flex-col">
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
                      likeDetails,
                      userId: userInfo?._id || null,
                      postId,
                    });
                  } else {
                    alert("로그인이 필요합니다.");
                  }
                }}
              />
              <Bookmark
                checked
                size={20}
                onClick={() => {
                  // 로그인 정보가 있다면
                  if (userInfo?._id) {
                    excuteLike({
                      likeDetails,
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
                trigger();
                console.log("등록", comment);
              }}
            />
          </section>
        </div>
      </section>
    </Modal>
  );
}
