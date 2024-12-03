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
  const { className, onChange = (file) => console.log(file) } = props;

  /** 업로드된 이미지 삭제 */
  const deleteImage = () => {
    setIsDelete(true);
  };

  return (
    <>
      <DragAndDrop
        rounded={false}
        isDelete={isDelete}
        className={className}
        onChange={onChange}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-4 border-dotted border-sky-400 bg-white">
          <FaPhotoVideo className="h-[30%] w-[30%]" color="#ced4da" />
          Drag and Drop your image here or click
        </div>
      </DragAndDrop>
      <section className="m-4 flex h-[40px] w-full justify-end">
        <ColorButton
          text="사진 삭제"
          className="h-full w-[100px] rounded-md bg-sky-400 text-[white]"
          onClick={deleteImage}
        />
      </section>
    </>
  );
}
