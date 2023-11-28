import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Bookmark from "@/components/Bookmark/Bookmark.component";
import Image from "next/image";

interface IPostProps {
  data: {
    /** 프로필 이미지 */
    profileSrc: string;
    /** 작성자 이름 */
    writerName: string;
    /** 게시글 이미지 */
    postSrc: string;
    /** 좋아요 여부 */
    like: boolean;
    /** 북마크 여부 */
    bookmark: boolean;
    /** 좋아요 개수 */
    likeNumber: number;
    /** 게시글 내용 */
    content: string;
    /** 게시글 생성 날짜 */
    createDate: string;
  };
}

/**
 * Post 컴포넌트
 */
export default function Post(props: IPostProps) {
  // props
  const { data } = props;

  return (
    <div className="w-[500px]">
      <section className="border-solid border-[1px] border-gray-200">
        <ProfileAndName src={data?.profileSrc} name={data?.writerName} />
      </section>
      <Image
        src={data?.postSrc}
        alt=""
        className="w-full h-[400px]"
        width={100}
        height={100}
      />
      <section>
        <section className="w-full flex flex-col gap-2 p-2 border-solid border-[1px] border-gray-200">
          <div className="w-full h-[30px] flex justify-between">
            <Like checked={data?.like} />
            <Bookmark checked={data?.bookmark} />
          </div>
          <div className="flex flex-col gap-2">
            <span>{data?.likeNumber} Like</span>
            <div className="flex gap-2">
              <span>{data?.writerName}</span>
              <span>{data?.content}</span>
            </div>
            <span className="text-gray-400">{data?.createDate} hours ago</span>
          </div>
        </section>
        <CommentInput />
      </section>
    </div>
  );
}
