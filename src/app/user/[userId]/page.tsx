"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import PostModal from "@/components/PostModal/PostModal.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import Tab from "@/components/Tab/Tab.component";
import { useModal } from "@/hooks/components/useModal";
import { useGetUserPost } from "@/hooks/post/useGetUserPost";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteFollow } from "@/utils/services/follow";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * 회원 게시물 페이지
 */
export default function User({ params }: { params: { userId: string } }) {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabs[0]);

  // 클릭한 Post의 id
  const [clickedId, setClickedId] = React.useState<number>();

  // modal 커스텀 훅
  const { isOpen, openModal, closeModal } = useModal();

  /**
   * 유저 개인의 포스트 데이터 호출
   */
  const {
    isLoading: postLoading,
    data: postData,
    error: postError,
    message: postMessage,
  } = useGetUserPost(params.userId, clickedTab);

  /**
   * 유저 프로필 데이터 호출
   */
  const {
    isLoading: userLoading,
    data: userData,
    error: userError,
    message: userMessage,
  } = useGetUserData(params.userId);

  const { isLogin, userInfo } = useLoginStore();

  React.useEffect(() => {
    if (postError) {
      alert(postMessage);
    }
    if (userError) alert(userMessage);
  }, [postError, postMessage, userError, userMessage]);

  return (
    <main className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-[1000px] flex-col items-center px-[10px]">
        <div className="flex h-[200px] w-full items-center justify-center gap-5 p-5 lg:gap-10">
          {/* 유저 프로필 이미지 */}
          {userLoading ? (
            <SkeletonUI
              isActive={userLoading}
              isCircle
              className="h-[100px] w-[100px]"
            />
          ) : (
            <BigProfileImage src={userData?.image_url || "/"} />
          )}
          <section className="flex flex-col gap-2 lg:gap-3">
            <article className="flex items-center gap-5 lg:gap-5">
              {/* 유저 이름 및 팔로우 버튼 */}
              {userLoading ? (
                <SkeletonUI
                  isActive={userLoading}
                  className="h-[25px] w-[100px]"
                />
              ) : (
                <>
                  <span>{userData?.username}</span>
                  {/* {isLogin && userInfo?.id !== userData?.id && (
                    <ColorButton
                      // TODO:  !!followDetails.find((followingId) => followingId.userId === followingId?._id)
                      text="Follow"
                      className="h-[30px] rounded-md bg-sky-400 px-3 text-white"
                      onClick={() => {
                        if (isLogin && userData) {
                          excuteFollow({
                            followerId: userData.id,
                          });
                        } else {
                          alert(
                            "페이지 오류가 발생하여 팔로우 등록/해제가 불가능합니다."
                          );
                        }
                      }}
                    />
                  )} */}
                </>
              )}
            </article>
            {/* 유저 게시물 수 및 팔로우, 팔로워 수 */}
            {userLoading ? (
              <SkeletonUI
                isActive={userLoading}
                className="h-[25px] w-[100px]"
              />
            ) : (
              <article className="flex flex-col gap-1 lg:flex-row lg:gap-5">
                <span>
                  <span className="font-bold">{userData?.totalPostCount}</span>{" "}
                  Posts
                </span>
                <span>
                  <Link
                    href={{
                      pathname: `/user/${params.userId}/follow`,
                      query: { type: "follower" },
                    }}
                  >
                    <span className="font-bold">{userData?.followers}</span>{" "}
                    followers
                  </Link>
                </span>

                <span>
                  <Link
                    href={{
                      pathname: `/user/${params.userId}/follow`,
                      query: { type: "following" },
                    }}
                  >
                    <span className="font-bold">{userData?.following}</span>{" "}
                    following
                  </Link>
                </span>
              </article>
            )}
            <article>
              {/* 유저 이름 */}
              {userLoading ? (
                <SkeletonUI
                  isActive={userLoading}
                  className="h-[25px] w-[100px]"
                />
              ) : (
                <span className="hidden font-bold lg:inline">
                  {userData?.username}
                </span>
              )}
            </article>
          </section>
        </div>
        <Tab
          tabArr={tabs}
          onChange={(selectedTab) => {
            setClickedTab(selectedTab);
          }}
        />
        {!postData ||
          (postData?.length === 0 && (
            <div className="flex h-[100px] w-full items-center justify-center">
              데이터가 없습니다.
            </div>
          ))}
        <ul className="mt-5 grid h-full w-full grid-cols-3 gap-1 lg:gap-4">
          {/* 유저 게시물 이미지 */}
          {postLoading ? (
            <>
              <SkeletonUI
                isActive={postLoading}
                className="aspect-[1/1] h-auto w-full"
              />
              <SkeletonUI
                isActive={postLoading}
                className="aspect-[1/1] h-auto w-full"
              />
            </>
          ) : postData && postData.length > 0 ? (
            postData.map((post) => (
              <li
                key={post.id.toString()}
                className="relative aspect-[1/1] h-auto w-full"
              >
                <button
                  onClick={() => {
                    openModal();
                    setClickedId(post.id);
                  }}
                >
                  <Image
                    src={post.image_url || "/"}
                    alt="post-image"
                    fill
                    className="object-cover"
                  />
                </button>
              </li>
            ))
          ) : null}
        </ul>

        {/* 게시물 이미지 클릭시 생성되는 게시물 모달 */}
        {isOpen && clickedId && (
          <PostModal
            open={isOpen}
            onClose={closeModal}
            userInfo={userInfo}
            id={clickedId}
          />
        )}
      </div>
    </main>
  );
}
