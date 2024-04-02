import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Image from "next/image";
import PostModal from "@/components/PostModal/PostModal.component";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPostData } from "@/typescript/post.interface";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteLike } from "@/utils/services/like";

// dayjs의 RelativeTime 플러그인 추가
dayjs.extend(relativeTime);
export interface IPostProps extends IPostData {
  /** 북마크 여부 */
  bookmark?: boolean;
  /** 좋아요 개수 */
  likeNumber?: number;
}

/**
 * Post 컴포넌트
 */
export default function Post(props: IPostProps) {
  // props
  const {
    /** 게시글 아이디 */
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
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  return (
    <div className="w-[500px]">
      <section className="border-solid border-[1px] border-gray-200">
        <ProfileAndName
          src={userDetails.at(0)?.image}
          name={userDetails.at(0)?.name || ""}
        />
      </section>
      {postSrc && (
        <div className="relative w-full h-[400px]">
          <Image src={postSrc} alt="" className="object-cover" fill />
        </div>
      )}
      <section>
        <section className="w-full flex flex-col gap-2 p-2 border-solid border-[1px] border-gray-200">
          <div className="w-full h-[30px] flex justify-between">
            <Like
              checked={
                !!likeDetails.find((like) => like.userId === userInfo?._id)
              }
              size={20}
              onClick={() =>
                excuteLike({
                  likeDetails,
                  userId: userInfo?._id || null,
                  postId,
                })
              }
            />
            <Bookmark checked size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <span>{likeDetails.length} Like</span>
            <p>
              <span className="min-w-[80px] max-w-[200px] font-bold mr-5">
                {userDetails.at(0)?.name || ""}
              </span>
              <span>{description}</span>
            </p>
            <span className="text-gray-400">{dayjs(createDate).fromNow()}</span>
          </div>
        </section>
        <CommentInput onClick={() => setOpen(true)} />
      </section>

      <PostModal
        open={open}
        onClose={() => setOpen(false)}
        PostProps={props}
        userInfo={userInfo}
      />
    </div>
  );
}
