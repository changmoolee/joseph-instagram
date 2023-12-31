"use client";
import React from "react";
import { BiSmile } from "react-icons/bi";

interface ICommentInputProps {
  /**
   * input에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (comment: string) => void;
}

/**
 * 댓글을 입력할 수 있는 Input과 Post 버튼
 */
export default function CommentInput(props: ICommentInputProps) {
  // props
  const { onChange = (comment) => console.log(comment) } = props;

  // 입력된 댓글 텍스트
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    onChange(comment);
  }, [comment, onChange]);

  return (
    <section className="w-full h-[50px] flex border-solid border-[1px] border-gray-200">
      <button className="w-[40px] h-full flex justify-center items-center">
        <BiSmile className="w-[25px] h-[25px]" />
      </button>
      <input
        placeholder="Add a comment..."
        className="w-[400px]"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button className="w-[60px] h-full flex justify-center items-center text-[#6cb9d2] font-[600]">
        Post
      </button>
    </section>
  );
}
