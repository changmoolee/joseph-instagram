"use client";

import React from "react";
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
      className="w-[500px] h-[400px]"
    >
      <label htmlFor="drag-and-drop" className="w-full h-full flex bg-white">
        <input
          id="drag-and-drop"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          ref={inputRef}
        />
      </label>
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
}
