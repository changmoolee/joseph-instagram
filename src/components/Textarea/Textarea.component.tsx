"use client";
import React from "react";

interface ITextareaProps {
  /**
   * textarea 요소에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (text: string) => void;
  /**
   *
   */
  placeholder: string;
}

/**
 * 텍스트를 입력할 수 있는 Textarea 컴포넌트
 */
export default function Textarea(props: ITextareaProps) {
  // props
  const { onChange = (text) => console.log(text), placeholder } = props;

  // textarea에 입력된 텍스트
  const [text, setText] = React.useState<string>("");

  React.useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <textarea
      className="w-full h-full p-1 box-border bg-white"
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
