"use client";

import { useRouter } from "next/navigation";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Textarea from "@/components/Textarea/Textarea.component";
import React from "react";
import PostDragAndDrop from "@/components/DragAndDrop/PostDragAndDrop/PostDragAndDrop.component";
import { ImageUpload } from "@/utils/services/upload";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { useLoginStore } from "@/store/useLoginStore";
import apiClient from "@/utils/axios";

export default function NewPost() {
  /** router */
  const router = useRouter();

  const [imageFile, setImageFile] = React.useState<File[]>();

  const [description, setDescription] = React.useState("");

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  // 프로필 데이터 체크
  React.useEffect(() => {
    if (!userInfo) {
      alert("로그인이 되어있지 않습니다.");
      router.push("/");
    }
  }, [userInfo, router]);

  /**
   * 게시물(post) 등록 함수
   */
  const postCreate = async () => {
    // 이미지 업 로드
    if (imageFile) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data } = imageUploadResponse;

      if (result === "success") {
        const postResponse: ICommonResponse = await apiClient.post(
          `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/post`,
          {
            image_url: data,
            description,
          }
        );

        const { result, message } = postResponse.data;

        if (result === "success") {
          alert(message);
          // 메인페이지로 이동
          router.push("/");
        }

        if (result === "failure") {
          // 에러메시지
          alert(message);
        }
      } else {
        alert("게시물 업로드에 실패했습니다.");
      }
    }
  };

  return (
    userInfo && (
      <main className="flex w-full justify-center">
        <section className="mt-5 flex w-full max-w-[400px] flex-col items-center px-[10px] lg:w-[500px]">
          <ProfileAndName
            src={userInfo.image_url || "/images/user.png"}
            name={userInfo.username || "error"}
          />
          <PostDragAndDrop
            className="mt-5 h-[300px] w-full lg:h-[250px]"
            onChange={(file) => {
              setImageFile(file);
            }}
          />
          <Textarea
            className="h-[300px] w-full p-[10px]"
            placeholder="글 작성하기..."
            onChange={(text) => {
              setDescription(text);
            }}
          />
          <ColorButton
            text="올리기"
            className="mt-5 h-[40px] w-full bg-blue-500"
            onClick={() => {
              postCreate();
            }}
          />
        </section>
      </main>
    )
  );
}
