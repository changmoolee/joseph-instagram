import React from "react";

interface ILoadingProps {
  /** 로딩 스피터 활성 유무 */
  isActive: boolean;
  /** className */
  className?: string;
}

/**
 * 로딩 컴포넌트
 */
export default function Loading(props: ILoadingProps) {
  // props
  const { isActive, className } = props;

  return (
    isActive && (
      <section
        className={`animate-spin w-10 h-10 border-2 border-black border-t-2 border-t-white rounded-full ${className}`}
      ></section>
    )
  );
}
