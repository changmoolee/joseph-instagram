"use client";

import Image from "next/image";
import React from "react";

interface IDragAndDropProps {
  /**
   * 이미지 둥금 여부
   */
  rounded: Boolean;
  /**
   * 수정 전 이미지 소스
   */
  prevSrc?: string;
  /**
   * 이미지 삭제 여부
   */
  isDelete?: boolean;
  /**
   * className
   */
  className?: string;
  /**
   * textarea 요소에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (file: File[]) => void;
  /**
   * children
   */
  children?: React.ReactNode;
}

/**
 * 드래그엔드랍 컴포넌트
 */
export default function DragAndDrop(props: IDragAndDropProps) {
  // props
  const {
    rounded,
    prevSrc,
    isDelete,
    className,
    onChange = (file) => console.log(file),
    children,
  } = props;

  const roundedStyle =
    "relative w-[300px] h-[300px] rounded-full overflow-hidden";

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previewImgSrc, setPreviewImgSrc] = React.useState<string>("");

  /**
   * input 요소에 들어가는 파일
   */
  const inputRef = React.useRef(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFiles = (files: File[]) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    const reader = new FileReader();

    if (e.dataTransfer.files) {
      if (e.dataTransfer.files.length !== 1) {
        alert("이미지는 한가지만 등록 가능합니다.");
        return;
      }
      reader.readAsDataURL(e.dataTransfer.files[0]);

      reader.onloadend = () => {
        setPreviewImgSrc(reader.result as string);
      };
    }
    // Handle the dropped files here
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    const reader = new FileReader();

    if (e.target.files) {
      if (e.target.files.length !== 1) {
        alert("이미지는 한가지만 등록 가능합니다.");
        return;
      }
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = () => {
        setPreviewImgSrc(reader.result as string);
      };
    }
    handleFiles(files);
  };

  /** 이미지 삭제 */
  const deleteImage = () => {
    setSelectedFiles([]);
    setPreviewImgSrc("");
  };

  React.useEffect(() => {
    onChange(selectedFiles);
  }, [selectedFiles, onChange]);

  React.useEffect(() => {
    if (isDelete) {
      deleteImage();
    }
  }, [isDelete]);

  React.useEffect(() => {
    if (prevSrc) {
      setPreviewImgSrc(prevSrc);
    }
  }, [prevSrc]);

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={className}
    >
      <label
        htmlFor="drag-and-drop"
        className="w-full h-full flex justify-center items-center"
      >
        <input
          id="drag-and-drop"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          ref={inputRef}
        />
        {selectedFiles.length !== 0 || previewImgSrc ? (
          <div className={rounded ? roundedStyle : "relative w-full h-full"}>
            <Image
              src={previewImgSrc}
              alt="profile-image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <>{children}</>
        )}
      </label>
    </section>
  );
}
