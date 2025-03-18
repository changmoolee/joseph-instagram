"use client";

// import ChatSection from "@/components/ChatSection/ChatSection.component";
import Loading from "@/components/Loading/Loading.component";
import Post from "@/components/Post/Post.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { useGetPosts } from "@/hooks/post/useGetPosts";
import { useLoginStore } from "@/store/useLoginStore";
import React from "react";

export default function Home() {
  // const [skip, setSkip] = React.useState<number>(1);

  const { isLoading, data: posts } = useGetPosts();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  return (
    <main className="flex h-full w-full justify-center">
      <section className="flex h-full w-full max-w-[500px] flex-col gap-[20px]">
        {isLoading ? (
          <Loading isActive={isLoading} className="mx-auto mt-[30px]" />
        ) : posts && posts.length > 0 ? (
          posts
            .filter((post) => post.user) // 탈퇴회원의 게시물 필터링
            .map((post) => <Post key={post.id} {...post} />)
        ) : (
          <div className="mt-5 flex justify-center">
            <span>게시물이 없습니다.</span>
          </div>
        )}
      </section>
      <section className="hidden h-full w-[300px] flex-col gap-5 p-5 lg:flex">
        {userInfo && (
          <ProfileAndName
            src={userInfo?.image_url || "/images/user.png"}
            name={userInfo?.username || "error"}
          />
        )}
        <p className="whitespace-pre-wrap">
          {`joseph-instagram에\n오신걸 환영합니다.`}
        </p>

        {/* <ChatSection /> */}
      </section>
    </main>
  );
}
