import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

interface ICommentProps {
  /**
   * 프로필 이미지 주소
   */
  imageUrl?: string;
  /**
   * 닉네임
   */
  nickName?: string;
  /**
   * 댓글 내용
   */
  commentContent?: string;
}

/**
 * 댓글 컴포넌트
 */
export default function Comment(props: ICommentProps) {
  // props
  const {
    imageUrl = "/",
    nickName = "닉네임",
    commentContent = "댓글 내용",
  } = props;

  return (
    <article className="flex items-center gap-2 p-2">
      <ProfileImage src={imageUrl} />
      <span className="font-bold">{nickName}</span>
      <span>{commentContent}</span>
    </article>
  );
}
