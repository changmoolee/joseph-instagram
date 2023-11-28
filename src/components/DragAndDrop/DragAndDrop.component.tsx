"use client";

import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

/**
 * 드래그엔드랍 컴포넌트
 */
export default function DragAndDrop() {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
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
    handleFiles(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[600px] h-[400px] border-dotted border-sky-400 border-4"
    >
      <label
        htmlFor="drag-and-drop"
        className="w-full h-full flex flex-col justify-center items-center gap-3 bg-white"
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
        <FaPhotoVideo className="w-[30%] h-[30%]" color="#ced4da" />
        Drag and Drop your image here or click
      </label>
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
}
