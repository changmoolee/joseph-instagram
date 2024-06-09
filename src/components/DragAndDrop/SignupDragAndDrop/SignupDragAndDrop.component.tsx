"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import DragAndDrop from "@/components/DragAndDrop/DragAndDrop.component";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

interface ISignupDragAndDropProps {
  /**
   * 수정 전 이미지 소스
   */
  prevSrc?: string;
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
export default function SignupDragAndDrop(props: ISignupDragAndDropProps) {
  // 이미지 삭제 여부
  const [isDelete, setIsDelete] = React.useState<boolean>(false);

  // props
  const { prevSrc, className, onChange = (file) => console.log(file) } = props;

  /** 업로드된 이미지 삭제 */
  const deleteImage = () => {
    setIsDelete(true);
  };

  return (
    <>
      <DragAndDrop
        rounded
        prevSrc={prevSrc}
        isDelete={isDelete}
        className={className}
        onChange={onChange}
      >
        <div className="aspect-square h-full flex flex-col justify-center items-center gap-3 bg-white border-dotted border-sky-400 border-4 rounded-full">
          <FaPhotoVideo className="w-[70%] h-[70%]" color="#ced4da" />
        </div>
      </DragAndDrop>
      <section className="w-full h-[40px] flex justify-end px-10 m-2">
        <ColorButton
          text="사진 삭제"
          className="w-[100px] h-full bg-sky-400 text-[white] rounded-md"
          onClick={deleteImage}
        />
      </section>
    </>
  );
}
