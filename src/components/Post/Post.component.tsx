import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Image from "next/image";
import PostModal from "@/components/PostModal/PostModal.component";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPost, IPostUnifiedData } from "@/typescript/post.interface";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteLike } from "@/utils/services/like";
import Link from "next/link";
import { excuteBookmark } from "@/utils/services/bookmark";
import { useModal } from "@/hooks/components/useModal";
import { IUser } from "@/typescript/user.interface";

// dayjs의 RelativeTime 플러그인 추가
dayjs.extend(relativeTime);
export interface IPostProps extends IPost {
  user: IUser;
  // /** 북마크 여부 */
  // bookmark?: boolean;
  // /** 좋아요 개수 */
  // likeNumber?: number;
}

/**
 * Post 컴포넌트
 */
export default function Post(props: IPostProps) {
  // props
  const {
    /** 게시글 아이디 */
    id: postId,
    /** 게시글 이미지 */
    image_url: postSrc,
    /** 게시글 내용 */
    description,
    /** 게시글 생성 날짜 */
    created_at: createDate,
    /** 북마크 여부 */
    // bookmark,
    /** 회원 정보 */
    user,
    // /** 좋아요 정보 */
    // likeDetails,
    // /** 북마크 정보 */
    // bookmarkDetails,
    // /** 댓글 정보 */
    // commentDetails,
  } = props;

  // modal 커스텀 훅
  const { isOpen, openModal, closeModal } = useModal();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  return (
    <div className="w-full">
      <Link href={`/user/${user.id}`}>
        <section className="border-[1px] border-solid border-gray-200">
          <ProfileAndName src={user.image} name={user.username || ""} />
        </section>
      </Link>
      {postSrc && (
        <div className="relative h-[400px] w-full">
          <Image src={postSrc} alt="" className="object-cover" fill />
        </div>
      )}
      <section>
        <section className="flex w-full flex-col gap-2 border-[1px] border-solid border-gray-200 px-4 py-2">
          <div className="flex h-[30px] w-full justify-between">
            {/* <Like
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
            /> */}
            {/* <Bookmark
              checked={
                !!bookmarkDetails.find(
                  (bookmark) => bookmark.userId === userInfo?._id
                )
              }
              size={20}
              onClick={() => {
                // 로그인 정보가 있다면
                if (userInfo?._id) {
                  excuteBookmark({
                    userId: userInfo?._id || null,
                    postId,
                  });
                } else {
                  alert("로그인이 필요합니다.");
                }
              }}
            /> */}
          </div>
          <div className="flex flex-col gap-2">
            {/* <span>{likeDetails.length} Like</span> */}
            <p>
              <span className="mr-5 min-w-[80px] max-w-[200px] font-bold">
                {user.username || ""}
              </span>
              <span>{description}</span>
            </p>
            <span className="text-gray-400">{dayjs(createDate).fromNow()}</span>
          </div>
        </section>
        <CommentInput onClick={openModal} />
      </section>

      {isOpen && (
        <PostModal
          open={isOpen}
          onClose={closeModal}
          PostProps={props}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}
