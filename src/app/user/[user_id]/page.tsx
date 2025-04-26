"use client";

import AlertModal from "@/components/AlertModal/AlertModal.component";
import ColorButton from "@/components/ColorButton/ColorButton.component";
import PostModal from "@/components/PostModal/PostModal.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import Tab from "@/components/Tab/Tab.component";
import { useModal } from "@/hooks/components/useModal";
import { useGetUserPost } from "@/hooks/post/useGetUserPost";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import { useLoginStore } from "@/store/useLoginStore";
import { IUserInfo } from "@/typescript/user.interface";
import { excuteFollow } from "@/utils/services/follow";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * 회원 게시물 페이지
 */
export default function User({ params }: { params: { user_id: string } }) {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  const router = useRouter();

  const { isLogin, userInfo } = useLoginStore();

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabs[0]);

  // 클릭한 Post의 id
  const [clickedId, setClickedId] = React.useState<number>();

  // modal 커스텀 훅
  const {
    isOpen: isPostOpen,
    openModal: openPostModal,
    closeModal: closePostModal,
  } = useModal();

  const {
    isOpen: isLoginOpen,
    message: loginMessage,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  /**
   * 유저 개인의 포스트 데이터 호출
   */
  const { isLoading: postLoading, data: postData } = useGetUserPost(
    params.user_id,
    clickedTab
  );

  /**
   * 유저 프로필 데이터 호출
   */
  const {
    isLoading: userLoading,
    data: userData,
    mutate,
  } = useGetUserInfo(params.user_id);

  const isFollower = !!userData?.followers.find(
    (follower) => follower.follower.id === userInfo?.id
  );

  const redirectToLogin = () => router.push("/login");

  const excuteFollowApi = async (userData: IUserInfo) => {
    if (!userInfo?.id) {
      openLoginModal("로그인이 필요합니다.");
      return;
    }

    const { result, message } = await excuteFollow({
      user_id: userData.id,
    });

    if (result === "success" && mutate) {
      mutate();
    }

    if (result === "failure") {
      alert(message);
    }
  };

  return (
    <main className="flex w-full justify-center">
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
            <BigProfileImage src={userData?.image_url} />
          )}
          <section className="flex flex-col gap-2 lg:gap-3">
            <article className="flex items-center gap-5">
              {/* 유저 이름 및 팔로우 버튼 */}
              {userLoading ? (
                <SkeletonUI
                  isActive={userLoading}
                  className="h-[25px] w-[100px]"
                />
              ) : (
                <>
                  <span>{userData?.username}</span>
                  {isLogin && userInfo?.id !== userData?.id && (
                    <ColorButton
                      text={isFollower ? "팔로잉" : "팔로우"}
                      className={`h-[30px] rounded-md px-3 text-white ${
                        isFollower ? "bg-black" : "bg-blue-500"
                      }`}
                      onClick={async () => {
                        if (isLogin && userData) {
                          excuteFollowApi(userData);
                        } else {
                          openLoginModal("로그인이 필요합니다.");
                        }
                      }}
                    />
                  )}
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
                  <span className="font-bold">
                    {userData?.posts.length || 0}
                  </span>{" "}
                  게시물
                </span>
                <span>
                  <Link
                    href={{
                      pathname: `/user/${params.user_id}/follow`,
                      query: { type: "follower" },
                    }}
                  >
                    <span className="font-bold">
                      {userData?.followers.length || 0}
                    </span>{" "}
                    팔로워
                  </Link>
                </span>

                <span>
                  <Link
                    href={{
                      pathname: `/user/${params.user_id}/follow`,
                      query: { type: "following" },
                    }}
                  >
                    <span className="font-bold">
                      {userData?.followings.length || 0}
                    </span>{" "}
                    팔로잉
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

        {postData && postData.length === 0 && (
          <div className="flex h-[100px] w-full items-center justify-center">
            데이터가 없습니다.
          </div>
        )}

        <ul className="mt-5 grid w-full grid-cols-3 gap-1 lg:gap-4">
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
                    openPostModal("로그인이 필요합니다.");
                    setClickedId(post.id);
                  }}
                >
                  <Image
                    src={post.image_url || "/"}
                    alt="post-image"
                    fill
                    className="object-cover"
                    sizes="300px ,(max-width: 1200px) 330px"
                  />
                </button>
              </li>
            ))
          ) : null}
        </ul>

        {/* 게시물 이미지 클릭시 생성되는 게시물 모달 */}
        {isPostOpen && clickedId && (
          <PostModal
            open={isPostOpen}
            onClose={closePostModal}
            userInfo={userInfo}
            id={clickedId}
          />
        )}

        {isLoginOpen && (
          <AlertModal
            message={loginMessage}
            open={isLoginOpen}
            onClose={closeLoginModal}
            showCancelButton={true}
            confirmAction={redirectToLogin}
          />
        )}
      </div>
    </main>
  );
}
