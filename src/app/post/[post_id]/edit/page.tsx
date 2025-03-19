"use client";

import { useRouter } from "next/navigation";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Textarea from "@/components/Textarea/Textarea.component";
import React from "react";
import PostDragAndDrop from "@/components/DragAndDrop/PostDragAndDrop/PostDragAndDrop.component";
import { ImageUpload } from "@/utils/services/upload";
import { useLoginStore } from "@/store/useLoginStore";
import { useGetPost } from "@/hooks/post/useGetPost";
import { editPost } from "@/utils/services/post";

export default function EditPostPage({
  params,
}: {
  params: { post_id: string };
}) {
  const { post_id } = params;

  /** router */
  const router = useRouter();

  const [imageFile, setImageFile] = React.useState<File[]>();

  const [description, setDescription] = React.useState("");

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  /** 게시물 데이터 */
  const { data: post } = useGetPost(parseInt(post_id));

  /**
   * 게시물(post) 업데이트 함수
   */
  const editCreate = async () => {
    // 기존 이미지 url 우선 할당
    let post_image_url = post?.image_url || "";

    // 새로운 이미지로 편집할시
    if (imageFile) {
      const imageUploadResponse = await ImageUpload(imageFile);

      const { result, data, message } = imageUploadResponse;

      if (result === "success" && data) {
        // 새로운 이미지 url 할당
        post_image_url = data;
      } else {
        alert(message);
        return;
      }
    }

    // 게시판 데이터 수정
    const postResponse = await editPost({
      post_id: parseInt(post_id),
      image_url: post_image_url,
      description,
    });

    const { result, message } = postResponse;

    if (result === "success") {
      alert(message);
      // 메인페이지로 이동
      router.push("/");
    }

    if (result === "failure") {
      // 에러메시지
      alert(message);
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
          {post && (
            <>
              <PostDragAndDrop
                className="mt-5 h-[300px] w-full lg:h-[250px]"
                prevSrc={post.image_url}
                onChange={(file) => {
                  setImageFile(file);
                }}
              />
              <Textarea
                className="h-[300px] w-full p-[10px]"
                placeholder="글 작성하기..."
                defaultValue={post.description || ""}
                onChange={(text) => {
                  setDescription(text);
                }}
              />
              <ColorButton
                text="수정하기"
                className="mt-5 h-[40px] w-full bg-blue-500"
                onClick={() => {
                  editCreate();
                }}
              />
            </>
          )}
        </section>
      </main>
    )
  );
}
