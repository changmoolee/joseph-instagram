"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Textarea from "@/components/Textarea/Textarea.component";
import React from "react";
import PostDragAndDrop from "@/components/DragAndDrop/PostDragAndDrop/PostDragAndDrop.component";
import { ImageUpload } from "../../../../utils/upload";
import { ICommonResponse } from "../../../../typescript/common/response.interface";

export default function NewPost() {
  /** router */
  const router = useRouter();

  const [imageFile, setImageFile] = React.useState<File[]>();

  const [description, setDescription] = React.useState("");

  /**
   * 게시물(post) 등록 함수
   */
  const postCreate = async () => {
    // 이미지 업 로드
    if (imageFile) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data } = imageUploadResponse;

      if (result === "success") {
        const postResponse: ICommonResponse = await axios.post("/api/post", {
          image: data,
          description,
        });

        const { result, message } = postResponse.data;

        if (result === "success") {
          alert(message);
          // 메인페이지로 이동
          router.push("/");
        }

        if (result === "fail") {
          // 에러메시지
          alert(message);
        }
      } else {
        alert("게시물 업로드에 실패했습니다.");
      }
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
