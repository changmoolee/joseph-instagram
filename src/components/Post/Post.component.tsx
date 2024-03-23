import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Image from "next/image";
import PostModal from "@/components/PostModal/PostModal.component";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs의 RelativeTime 플러그인 추가
dayjs.extend(relativeTime);
export interface IPostProps {
  /** 프로필 이미지 */
  profileSrc?: string;
  /** 작성자 이름 */
  username: string;
  /** 게시글 이미지 */
  postSrc?: string;
  /** 좋아요 여부 */
  like?: boolean;
  /** 북마크 여부 */
  bookmark?: boolean;
  /** 좋아요 개수 */
  likeNumber: number;
  /** 게시글 내용 */
  description: string;
  /** 게시글 생성 날짜 */
  createDate: string;
}

/**
 * Post 컴포넌트
 */
export default function Post(props: IPostProps) {
  // props
  const {
    /** 프로필 이미지 */
    profileSrc,
    /** 작성자 이름 */
    username,
    /** 게시글 이미지 */
    postSrc,
    /** 좋아요 여부 */
    like,
    /** 북마크 여부 */
    bookmark,
    /** 좋아요 개수 */
    likeNumber,
    /** 게시글 내용 */
    description,
    /** 게시글 생성 날짜 */
    createDate,
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className="w-[500px]">
      <section className="border-solid border-[1px] border-gray-200">
        <ProfileAndName src={profileSrc} name={username} />
      </section>
      {postSrc && (
        <div className="relative w-full h-[400px] object-cover">
          <Image src={postSrc} alt="" className="object-cover" fill />
        </div>
      )}
      <section>
        <section className="w-full flex flex-col gap-2 p-2 border-solid border-[1px] border-gray-200">
          <div className="w-full h-[30px] flex justify-between">
            {like && <Like checked={like} />}
            {bookmark && <Bookmark checked={bookmark} />}
          </div>
          <div className="flex flex-col gap-2">
            <span>{likeNumber} Like</span>
            <p>
              <span className="min-w-[80px] max-w-[200px] font-bold mr-5">
                {username}
              </span>
              <span>{description}</span>
            </p>
            <span className="text-gray-400">{dayjs(createDate).fromNow()}</span>
          </div>
        </section>
        <CommentInput onClick={() => setOpen(true)} />
      </section>

      <PostModal open={open} onClose={() => setOpen(false)} PostProps={props} />
    </div>
  );
}
