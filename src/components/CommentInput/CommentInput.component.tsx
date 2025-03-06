"use client";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import React from "react";
import { BiSmile } from "react-icons/bi";

interface ICommentInputProps {
  /**
   * button 내부에 들어갈 텍스트
   */
  buttonText?: string;
  /**
   * CommentInput을 클릭할 때 실행하는 함수
   */
  onClick?: () => void;
  /**
   * input에 입력되는 텍스트를 체크하는 함수
   */
  onChange?: (comment: string) => void;
  /**
   * 버튼 요소를 클릭할 때 실행하는 함수
   */
  onButtonClick?: () => void;
}

/**
 * 댓글을 입력할 수 있는 Input과 Post 버튼
 */
export default function CommentInput(props: ICommentInputProps) {
  // props
  const { onClick, onChange, onButtonClick, buttonText = "Post" } = props;

  // 입력된 댓글 텍스트
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    onChange && onChange(comment);
  }, [comment, onChange]);

  return (
    <section
      className="flex h-[50px] w-full items-center justify-center border-[1px] border-solid border-gray-200 px-[10px]"
      onClick={onClick}
    >
      <button className="flex h-full w-[50px] items-center justify-center">
        <BiSmile className="h-[25px] w-[25px]" />
      </button>
      <input
        placeholder="Add a comment..."
        className="w-full px-2"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <ColorButton
        text="보내기"
        onClick={onButtonClick}
        className="h-[40px] w-[80px] bg-blue-500"
      >
        {buttonText}
      </ColorButton>
    </section>
  );
}
