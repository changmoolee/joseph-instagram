"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Textarea from "@/components/Textarea/Textarea.component";
import React from "react";
import PostDragAndDrop from "@/components/DragAndDrop/PostDragAndDrop/PostDragAndDrop.component";

export default function NewPost() {
  /** router */
  const router = useRouter();

  const [imageFile, setImageFile] = React.useState<File[]>();

  const [description, setDescription] = React.useState("");

  /**
   * 게시물(post) 등록 함수
   */
  const postCreate = async () => {
    if (!imageFile || imageFile.length === 0) {
      alert("등록할 이미지가 없습니다.");
      return;
    }

    const response = await axios.post("/api/upload", {
      imageInfo: JSON.stringify({
        filename: imageFile[0].name,
        contentType: imageFile[0].type,
      }),
      description,
    });

    const { result, data, message } = response.data;

    if (result === "success") {
      const { url, fields } = data;

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", imageFile[0]);

      try {
        await axios.post(url, formData);

        alert("게시물이 정상적으로 업로드되었습니다.");
        router.push("/");
      } catch (error: any) {
        alert(error.message);
      }
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  return (
    <main className="w-full flex justify-center">
      <section className="w-[600px] flex flex-col items-center mt-5">
        <ProfileAndName src="/" name="wow" />
        <PostDragAndDrop
          onChange={(file) => {
            setImageFile(file);
          }}
        />
        <Textarea
          placeholder="Write a capiton..."
          onChange={(text) => {
            setDescription(text);
          }}
        />
        <ColorButton
          text="Publish"
          className="w-full h-[40px] bg-sky-400"
          onClick={() => {
            postCreate();
          }}
        />
      </section>
    </main>
  );
}
