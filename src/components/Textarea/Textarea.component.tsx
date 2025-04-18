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
   * textarea 기본값
   */
  defaultValue?: string;
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
    defaultValue = "",
    onChange = (text) => console.log(text),
  } = props;

  const [value, setValue] = React.useState<string>(defaultValue);

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <textarea
      className={`box-border resize-none rounded-lg border-2 border-solid border-gray-200 bg-white p-1 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
