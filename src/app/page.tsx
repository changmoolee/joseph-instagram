"use client";

import Loading from "@/components/Loading/Loading.component";
import Post from "@/components/Post/Post.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { useGetPosts } from "@/hooks/post/useGetPosts";
import { useLoginStore } from "@/store/useLoginStore";
import React from "react";

export default function Home() {
  // const [skip, setSkip] = React.useState<number>(1);

  const { isLoading, data: postData } = useGetPosts();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-[500px] h-full">
        <section className="w-full flex gap-5 border-[2px] p-5 border-gray-100 border-box"></section>
        {/* 친구들이 올린 post 데이터 내림차순 */}
        {isLoading ? (
          <Loading isActive={isLoading} className="mx-auto mt-5" />
        ) : postData && postData.length > 0 ? (
          postData.map((post) => <Post key={post._id.toString()} {...post} />)
        ) : (
          <div className="flex justify-center mt-5">
            <span>게시물이 없습니다.</span>
          </div>
        )}
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
