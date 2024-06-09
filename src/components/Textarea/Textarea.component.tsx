"use client";
import React from "react";

interface ITextareaProps {
  /**
   * placeholder
   */
  placeholder?: string;
  /**
   * className
   */
  className?: string;
  /**
   * textarea 요소에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (text: string) => void;
}

/**
 * 텍스트를 입력할 수 있는 Textarea 컴포넌트
 */
export default function Textarea(props: ITextareaProps) {
  // props
  const {
    placeholder,
    className = "w-[600px] h-[300px]",
    onChange = (text) => console.log(text),
  } = props;

  // textarea에 입력된 텍스트
  const [text, setText] = React.useState<string>("");

  React.useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <textarea
      className={`p-1 rounded-lg border-2 border-gray-200 border-solid resize-none bg-white box-border ${className}`}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
