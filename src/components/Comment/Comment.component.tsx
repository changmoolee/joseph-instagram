import ProfileImage from "@/components/ProfileImage/ProfileImage.component";
import { IPostComment } from "@/typescript/post.interface";
import { deleteComment } from "@/utils/services/comment";
import { mutate } from "swr";

interface ICommentProps {
  /**
   * 삭제 가능 여부 (생성 회원 = 로그인 회원 일치 여부)
   */
  isDeletable?: boolean;
  /**
   * 게시물 id
   */
  post_id: number;
  /**
   * 댓글 데이터
   */
  comment: IPostComment;
}

/**
 * 댓글 컴포넌트
 */
export default function Comment(props: ICommentProps) {
  // props
  const { isDeletable = false, post_id, comment } = props;

  const {
    id,
    content = "댓글 내용",
    user: { image_url = "/", username = "닉네임" },
  } = comment;

  /** 댓글 조회 훅 key */
  const getCommentsUrlKey = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/comment/post/${post_id}`;

  const deleteCommentApi = async (comment_id: number) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    const { result, message } = await deleteComment(comment_id);

    if (result === "success") {
      mutate(getCommentsUrlKey);
    }
    if (result === "failure") {
      alert(message);
    }
  };

  return (
    <article className="flex flex-col gap-[10px] p-[10px]">
      <section className="flex items-center gap-[10px]">
        <ProfileImage src={image_url} />
        <span className="font-bold">{username}</span>
      </section>
      <p>{content}</p>
      <div className="flex justify-end gap-[15px] text-[14px] text-gray-400">
        <button onClick={() => alert("기능 제작중입니다.")}>답글 달기</button>
        {isDeletable && (
          <button onClick={() => deleteCommentApi(id)}>삭제</button>
        )}
      </div>
    </article>
  );
}
