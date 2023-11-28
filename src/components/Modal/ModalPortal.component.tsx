"use client";

import React from "react";
import ReactDom from "react-dom";

interface IModalPortalProps {
  /**
   * children
   */
  children: React.ReactNode;
}

/**
 * 모달을 최상위 요소에 랜더링
 */
export default function ModalPortal(props: IModalPortalProps) {
  // props
  const { children } = props;

  // 마운트 상태
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? ReactDom.createPortal(children, document.body) : null;
}
