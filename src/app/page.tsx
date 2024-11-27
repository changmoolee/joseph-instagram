"use client";

import ChatSection from "@/components/ChatSection/ChatSection.component";
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
    <main className="flex h-full w-full justify-center">
      <section className="h-full w-full max-w-[500px]">
        <section className="border-box flex w-full gap-5 border-[2px] border-gray-100 p-5"></section>
        {/* 친구들이 올린 post 데이터 내림차순 */}
        {isLoading ? (
          <Loading isActive={isLoading} className="mx-auto mt-5" />
        ) : postData && postData.length > 0 ? (
          postData.map((post) => <Post key={post._id.toString()} {...post} />)
        ) : (
          <div className="mt-5 flex justify-center">
            <span>게시물이 없습니다.</span>
          </div>
        )}
      </section>
      <section className="hidden h-full w-[200px] flex-col gap-5 p-5 lg:flex">
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
        <ChatSection />
      </section>
    </main>
  );
}
