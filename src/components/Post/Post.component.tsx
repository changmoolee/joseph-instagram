import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Image from "next/image";
import PostModal from "@/components/PostModal/PostModal.component";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IBookmark, ILike, IPost } from "@/typescript/post.interface";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteLike } from "@/utils/services/like";
import Link from "next/link";
import { excuteBookmark } from "@/utils/services/bookmark";
import { useModal } from "@/hooks/components/useModal";
import { IUser } from "@/typescript/user.interface";
import { mutate } from "swr";
import AlertModal from "@/components/AlertModal/AlertModal.component";

// dayjs의 RelativeTime 플러그인 추가
dayjs.extend(relativeTime);
export interface IPostProps extends IPost {
  user: IUser;
  likes: ILike[];
  bookmarks: IBookmark[];
}

/**
 * Post 컴포넌트
 */
export default function Post(props: IPostProps) {
  // props
  const {
    /** 게시글 아이디 */
    id: post_id,
    /** 게시글 이미지 */
    image_url: postSrc,
    /** 게시글 내용 */
    description,
    /** 게시글 생성 날짜 */
    created_at: createDate,
    /** 회원 정보 */
    user,
    /** 좋아요 정보 */
    likes,
    /** 북마크 정보 */
    bookmarks,
  } = props;

  const getPostsUrlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post`;

  // modal 커스텀 훅
  const {
    isOpen: isPostOpen,
    openModal: openPostModal,
    closeModal: closePostModal,
  } = useModal();

  const {
    isOpen: isLoginOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  const excuteLikeApi = async () => {
    if (!userInfo?.id) {
      openLoginModal();
      return;
    }

    const { result, message } = await excuteLike({
      post_id,
    });

    if (result === "success") {
      mutate(getPostsUrlKey);
    }
    if (result === "failure") {
      alert(message);
    }
  };

  const excuteBookmarkApi = async () => {
    if (!userInfo?.id) {
      openLoginModal();
      return;
    }

    const { result, message } = await excuteBookmark({
      post_id,
    });

    if (result === "success") {
      mutate(getPostsUrlKey);
    }
    if (result === "failure") {
      alert(message);
    }
  };

  return (
    <div className="w-full">
      <Link href={`/user/${user.id}`}>
        <section className="border-[1px] border-solid border-gray-200">
          <ProfileAndName src={user.image_url} name={user.username || ""} />
        </section>
      </Link>
      {postSrc && (
        <div className="relative h-[400px] w-full">
          <Image
            src={postSrc}
            alt=""
            className="object-cover"
            fill
            sizes="300px ,(max-width: 1200px) 500px"
          />
        </div>
      )}
      <section>
        <section className="flex w-full flex-col gap-2 border-[1px] border-solid border-gray-200 px-4 py-2">
          <div className="flex h-[30px] w-full justify-between">
            <Like
              checked={!!likes?.find((like) => like.user.id === userInfo?.id)}
              size={25}
              onClick={excuteLikeApi}
            />
            <Bookmark
              checked={
                !!bookmarks?.find(
                  (bookmark) => bookmark.user.id === userInfo?.id
                )
              }
              size={25}
              onClick={excuteBookmarkApi}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>{likes.length} Like</span>
            <p>
              <span className="mr-5 min-w-[80px] max-w-[200px] font-bold">
                {user.username || ""}
              </span>
              <span>{description}</span>
            </p>
            <span className="text-gray-400">{dayjs(createDate).fromNow()}</span>
          </div>
        </section>
        <CommentInput readOnly onClick={openPostModal} />
      </section>
      {isPostOpen && (
        <PostModal
          open={isPostOpen}
          onClose={closePostModal}
          userInfo={userInfo}
          id={post_id}
        />
      )}

      {isLoginOpen && (
        <AlertModal
          message="로그인이 필요합니다."
          open={isLoginOpen}
          onClose={closeLoginModal}
          showCancelButton={true}
        />
      )}
    </div>
  );
}
