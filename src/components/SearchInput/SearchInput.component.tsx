"use client";
import React from "react";

interface ISearchInputProps {
  /**
   * input에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (comment: string) => void;
  /**
   * 엔터를 누를시 실행되는 함수
   */
  handleKeyDown?: () => void;
}

/**
 * 검색어를 입력할 수 있는 Input
 */
export default function SearchInput(props: ISearchInputProps) {
  // props
  const { onChange = (comment) => console.log(comment), handleKeyDown } = props;

  // 입력된 검색어 텍스트
  const [comment, setComment] = React.useState<string>("");

  /**
   * 엔터를 누를 시 실행되는 함수
   */
  const onKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleKeyDown && handleKeyDown();
    }
  };

  React.useEffect(() => {
    onChange(comment);
  }, [comment, onChange]);

  return (
    <input
      placeholder="Search for username or name"
      className="w-full h-[50px] flex border-solid p-3 border-[2px] border-gray-3s00 "
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}
      onKeyDown={onKeyDownEnter}
    />
  );
}
