"use client";

// import ChatSection from "@/components/ChatSection/ChatSection.component";
import Loading from "@/components/Loading/Loading.component";
import Post from "@/components/Post/Post.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { useGetInfinitePosts } from "@/hooks/post/useGetInfinitePosts";
import { useLoginStore } from "@/store/useLoginStore";
import React from "react";

export default function Home() {
  /**
   * 무한스크롤 element
   */
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  const {
    data: posts,
    setSize,
    isLoading,
    isReachingEnd,
  } = useGetInfinitePosts();

  React.useEffect(() => {
    const element = loaderRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isReachingEnd) {
          setSize((prev) => prev + 1);
        }
      },
      { threshold: 0.8 } // 80%
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isReachingEnd, setSize]);

  return (
    <main className="flex h-full w-full justify-center">
      <section className="flex h-full w-full max-w-[500px] flex-col gap-[20px]">
        {isLoading ? (
          <Loading isActive={isLoading} className="mx-auto mt-[30px]" />
        ) : posts && posts.length > 0 ? (
          <>
            {/* 게시물 데이터 */}
            {posts
              .filter((post) => post.user) // 탈퇴회원의 게시물 필터링
              .map((post) => (
                <Post key={post.id} {...post} />
              ))}

            {!isReachingEnd ? (
              /* (무한스크롤 요소) 해당 요소가 보이면 다음 페이지 데이터 요청 */
              <div ref={loaderRef} className="my-[30px] flex w-full">
                <Loading isActive className="mx-auto" />
              </div>
            ) : (
              /* 마지막 게시물일 경우 문구*/
              <div
                ref={loaderRef}
                className="my-[30px] flex w-full justify-center"
              >
                마지막 게시물입니다.
              </div>
            )}
          </>
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
