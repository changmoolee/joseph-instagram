"use client";

import Post from "@/components/Post/Post.component";
import ProfileAboveName from "@/components/ProfileAboveName/ProfileAboveName.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { useLoginStore } from "@/store/useLoginStore";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { IPostData } from "@/typescript/post.interface";
import apiClient from "@/utils/axios";
import Link from "next/link";
import React from "react";

export default function Home() {
  const [skip, setSkip] = React.useState<number>(1);
  const [postData, setPostData] = React.useState<IPostData[]>([]);

  /** 게시물 데이터 */
  const getPostData = async () => {
    const response: ICommonResponse<IPostData[]> = await apiClient.get(
      "/api/post",
      {}
    );

    const { result, data, message } = response.data;

    if (result === "success" && data) {
      setPostData(data);
    }

    if (result === "fail") {
      alert(message || "게시물을 불러오지 못했습니다.");
    }
  };

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  React.useEffect(() => {
    getPostData();
  }, [skip]);

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-[500px] h-full">
        <section className="w-full flex gap-5 border-[2px] p-5 border-gray-100 border-box"></section>
        {/* 친구들이 올린 post 데이터 내림차순 */}
        {postData.map((post) => (
          <Post
            key={post._id}
            postSrc={post.image || ""}
            profileSrc={post.userDetails.at(0)?.image}
            username={post.userDetails.at(0)?.name || ""}
            description={post.description || ""}
            likeNumber={post.like_user?.length || 0}
            createDate={post.CreateDate || ""}
          />
        ))}
      </section>
      <section className="w-[200px] h-full flex flex-col gap-5 p-5">
        {userInfo && (
          <ProfileAndName
            src={userInfo?.image || "/images/user.png"}
            name={userInfo?.name || "error"}
          />
        )}
        <div>
          {[
            "About",
            "Help",
            "Press",
            "API",
            "Jobs",
            "Privacy",
            "Terms",
            "Location",
            "Language",
          ].map((value) => (
            <span key={value} className="text-gray-500">
              {value}
            </span>
          ))}
        </div>
        <div>
          <span>@Copyright INSTANTGRAM from META</span>
        </div>
      </section>
    </main>
  );
}
