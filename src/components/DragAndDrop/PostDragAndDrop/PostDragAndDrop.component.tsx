"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import DragAndDrop from "@/components/DragAndDrop/DragAndDrop.component";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

interface IPostDragAndDropProps {
  /**
   * className
   */
  className?: string;
  /**
   * 수정 전 이미지 소스
   */
  prevSrc?: string;
  /**
   * textarea 요소에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (file: File[]) => void;
}

/**
 * 게시물 이미지 드래그엔드랍 컴포넌트
 */
export default function PostDragAndDrop(props: IPostDragAndDropProps) {
  // 이미지 삭제 여부
  const [isDelete, setIsDelete] = React.useState<boolean>(false);

  // props
  const { className, prevSrc, onChange = (file) => console.log(file) } = props;

  /** 업로드된 이미지 삭제 */
  const deleteImage = () => {
    setIsDelete(true);
  };

  return (
    <>
      <DragAndDrop
        prevSrc={prevSrc}
        rounded={false}
        isDelete={isDelete}
        className={className}
        onChange={onChange}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-4 border-dotted border-sky-400 bg-white">
          <FaPhotoVideo className="h-[30%] w-[30%]" color="#ced4da" />
          이미지 파일을 끌어오거나 클릭하세요.
        </div>
      </DragAndDrop>
      <section className="m-4 flex h-[40px] w-full justify-end">
        <ColorButton
          text="사진 삭제"
          className="h-full w-[80px] bg-black"
          onClick={deleteImage}
        />
      </section>
    </>
  );
}
