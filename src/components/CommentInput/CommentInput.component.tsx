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
   * 입력된 댓글 텍스트
   */
  value?: string;
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
  const {
    value,
    onClick,
    onChange,
    onButtonClick,
    buttonText = "Post",
  } = props;

  return (
    <section
      className="flex h-[50px] w-full items-center justify-center border-[1px] border-solid border-gray-200 px-[10px]"
      onClick={onClick}
    >
      <button
        className="flex h-full w-[50px] items-center justify-center"
        onClick={() => alert("기능 제작중입니다")}
      >
        <BiSmile className="h-[25px] w-[25px]" />
      </button>
      <input
        placeholder="댓글을 추가하세요."
        className="w-full px-2"
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
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
