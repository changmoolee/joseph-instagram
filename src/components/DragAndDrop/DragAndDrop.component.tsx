"use client";

import Image from "next/image";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

interface IDragAndDropProps {
  /**
   * textarea 요소에 입력되는 텍스트를 체크하는 파라미터
   */
  onChange?: (file: File[]) => void;
}

/**
 * 드래그엔드랍 컴포넌트
 */
export default function DragAndDrop(props: IDragAndDropProps) {
  // props
  const { onChange = (file) => console.log(file) } = props;

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
    // Handle the dropped files here
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = () => {
        setPreviewImgSrc(reader.result as string);
      };
    }
    handleFiles(files);
  };

  React.useEffect(() => {
    onChange(selectedFiles);
  }, [selectedFiles, onChange]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[600px] h-[300px]"
    >
      {selectedFiles.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-3 bg-white border-dotted border-sky-400 border-4">
          <input
            id="drag-and-drop"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            ref={inputRef}
          />
          <FaPhotoVideo className="w-[30%] h-[30%]" color="#ced4da" />
          Drag and Drop your image here or click
        </div>
      ) : (
        <Image
          src={previewImgSrc}
          alt="profile-image"
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      )}
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
}
